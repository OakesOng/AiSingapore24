from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import NoSuchElementException, TimeoutException
import undetected_chromedriver as uc
import random
import time


def wait_and_get_element(by, selector):
    """
    Wait for the element located by the given 'by' and 'selector' to be present on the page.
    
    Args:
        by: The locator strategy to use for finding the element (e.g., By.ID, By.CLASS_NAME, By.XPATH).
        selector: The value of the selector used to locate the element.
        
    Returns:
        The located element once it is present on the page.
    """

    return wait.until(
        EC.presence_of_element_located((by, selector))
    )

def wait_and_get_elements(by, selector):
    """
    Wait for all elements located by the given 'by' and 'selector' to be present on the page.
    
    Args:
        by: The locator strategy to use for finding the elements (e.g., By.ID, By.CLASS_NAME, By.XPATH).
        selector: The value of the selector used to locate the elements.
        
    Returns:
        A list of all located elements once they are present on the page.
    """
    return wait.until(
        EC.presence_of_all_elements_located((by, selector))
    )

def get_info(xpath):
    """
    Get the text content of the element located by the given XPath.
    
    Args:
        xpath: The XPath expression used to locate the element.
        
    Returns:
        The text content of the located element if found, otherwise an empty string.
    """
    try:
        return driver.find_element(By.XPATH, xpath).text
    except NoSuchElementException:
        return ''

def scrape_course_info(course_url):
    '''
    Scrape course information for a particular course from the given course URL.
    
    Args:
        course_url: The URL of the course page to scrape.
        
    Returns:
        A tuple containing the course ID and a dictionary of course information.
    '''
    course_info = {}
    driver.get(course_url)
    try:
        wait.until(lambda driver: driver.find_element(By.XPATH,
            '//p[@data-bind="html : courseDetail.courseObjective"]').text.strip() != '')
    except TimeoutException:
        driver.refresh()
        try:
            wait.until(lambda driver: driver.find_element(By.XPATH,
                '//p[@data-bind="html : courseDetail.courseObjective"]').text.strip() != '')
        except:
            return '', {}
    
    # relevant fields
    course_id = get_info('//span[@data-bind="html : courseDetail.extCourseRefNo"]')
    course_info["course_title"] = get_info('//h2[@data-bind="text : courseDetail.courseTitle"]')
    course_info["training_organisation"] = get_info('//span[@data-bind="text : courseDetail.trainingProviderAlias() || courseDetail.trainingOrganisation.organizationName()"]')
    # Add more fields as needed
    
    return course_id, course_info

def scrape_courses(area_name, area_url):
    '''
    Scrape course information for a specific area using the provided area name and URL. 
    
    Args:
        area_name: The name of the area for which course information is being scraped.
        area_url: The URL of the area page containing the course listings.
        
    Returns:
        No return values
    '''
    courses = {}
    driver.get(area_url)
    course_links = []
    failed_course_links = []

    while True:
        if course_links:
            wait.until(EC.staleness_of(course_links[0]))
        try:
            wait.until(
                lambda driver: driver.find_element(By.CSS_SELECTOR, 'div.card-course-main-info-holder>h5.card-title>a').get_attribute('href') is not None
            )
        except TimeoutException:
            driver.refresh()
            try:
                wait.until(
                    lambda driver: driver.find_element(By.CSS_SELECTOR, 'div.card-course-main-info-holder>h5.card-title>a').get_attribute('href') is not None
                )
            except TimeoutException:
                print(f"Scrap failed for {area_name} page: {driver.current_url}")
                break

        course_links = driver.find_elements(By.CSS_SELECTOR, 'div.card-course-main-info-holder>h5.card-title>a')
        original_window = driver.current_window_handle
        count = 0
        temp_courses = []  # Temporary list for collected courses
        id_set = set()  # Set to store unique course IDs
        
        for link in course_links:       
            driver.switch_to.window(original_window)
            course_url = link.get_attribute('href')
            driver.switch_to.new_window('tab')
            course_id, course_info = scrape_course_info(course_url)
            driver.close()
            if not course_id:
                failed_course_links.append(link)
                print(f"Scrap failed for course: {link}")
                continue
            course_info['area_of_training'] = area_name
            courses[course_id] = course_info
            count += 1
            temp_courses.append((course_id, course_info))
            
            # If we have collected enough courses, write to file and reset counters
            if count >= 10:
                time.sleep(10)
                if temp_courses:
                    with open("course.txt", "a", encoding="utf-8") as outputfile:
                        for course_id, course_info in temp_courses:
                            if course_id not in id_set:
                                outputfile.write(f"{course_id}: {course_info}\n")
                                id_set.add(course_id)
                        temp_courses = []  # Clear temporary list
                    count = 0
                    
        driver.switch_to.window(original_window)
        next_button = driver.find_element(By.XPATH,'//li[@data-bind="attr: { class: $root.paginationModel.hasNext() ? \'page-item\' : \'page-item disabled\', name:  \'next\'  }"]')
        if "disabled" in next_button.get_attribute("class").split(" "):
            break
        else:
            ActionChains(driver).move_to_element(next_button).click().perform()

if __name__ == "__main__":
    
    # Set up Chrome options
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
        "Mozilla/5.0 (iPhone14,3; U; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19A346 Safari/602.1"
    ]
    random_user_agent = random.choice(user_agents)
    options = uc.ChromeOptions()
    options.add_argument('--headless=new')
    options.add_argument(f"user-agent={random_user_agent}")
    driver = uc.Chrome(options=options)
    
    URL = "https://www.myskillsfuture.gov.sg/content/portal/en/training-exchange/course-landing.html"
    driver.get(URL)
    wait = WebDriverWait(driver, 20)

    areas_of_training = wait_and_get_elements(By.CSS_SELECTOR, 'div.col>a.navbar-item')
    areas = {}
    for area in areas_of_training:
        area_name = area.get_attribute('text')
        area_url = area.get_attribute('href')
        areas[area_name] = area_url
        
    FIELD = "Others" # substitute to correct area for this constant in this code.
        
    scrape_courses(FIELD, areas[FIELD])
    driver.quit()
