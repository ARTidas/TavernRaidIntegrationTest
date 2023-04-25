const {By, Key, Builder, until} = require("selenium-webdriver");
require("chromedriver");
const chrome = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');
const options = new chrome.Options();

options.addArguments('--headless');
options.addArguments('--disable-gpu');
options.addArguments('--window-size=1280,800');

console.log('-----------------------------------------------------------------------');
console.log('///START///////////////////////////////////////////////////////////////');
try {
    console.log("///testRootPageTitle('0001')");
    testRootPageTitle('0001');
    //TODO: Fix the page title for this test.
    //console.log("///testUserRegistrationPageTitle('0002')");
    //testUserRegistrationPageTitle('0002');
    console.log("///testUserRegistrationPageFormEmptySubmit('0003')");
    testUserRegistrationPageFormEmptySubmit('0003');
    console.log("///testUserRegistrationPageFormSubmitWithIncorrectData('0004')");
    testUserRegistrationPageFormSubmitWithIncorrectData('0004');
} catch (exception) {
    console.error('Something went wrong:', exception.stack);
}
console.log('///END/////////////////////////////////////////////////////////////////');


function getDriver() {
    return new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
}


function testRootPageTitle(test_id) {
    const driver = getDriver();
    driver.get('https://theapp.artidas.hu/tavernraid/')
        .then(() => {
            return driver.getTitle();
        })
        .then((title) => {
            if (title === 'Tavern Raid') {
                console.log('///OK' + test_id + ': Page title is:', title);
            } else {
                console.error('---ERROR' + test_id + ': Page title does not match the expected title:', title);
            }
        })
        .catch((err) => {
            console.error('---ERROR' + test_id + ': ', err.stack);
        })
        .finally(() => {
            return driver.quit();
        });
}

function testUserRegistrationPageTitle(test_id) {
    const driver = getDriver();
    driver.get('https://theapp.artidas.hu/tavernraid/web/user/registration')
        .then(() => {
            return driver.getTitle();
        })
        .then((title) => {
            if (title === 'Tavern Raid > Felhasználó regisztráció') {
                console.log('///OK' + test_id + ': Page title is:', title);
            } else {
                console.error('---ERROR' + test_id + ': Page title does not match the expected title:', title);
            }
        })
        .catch((err) => {
            console.error('---ERROR' + test_id + ': ', err.stack);
        })
        .finally(() => {
            return driver.quit();
        });
}

function testUserRegistrationPageFormEmptySubmit(test_id) {
    const driver = getDriver();
    driver.get('https://theapp.artidas.hu/tavernraid/web/user/registration')
        .then(() => driver.findElement(webdriver.By.name('registration')).submit())
        .then(() => driver.wait(webdriver.until.elementLocated(webdriver.By.id('messages'))))
        .then(() => {
            return driver.findElement(webdriver.By.id('messages')).getText();
        })
        .then((messages_div_text) => {
            if (messages_div_text.includes('The registration was not successful!')) {
                console.log('///OK' + test_id + ': The div contains the string "The registration was not successful!"');
            } else {
                console.error('---ERROR' + test_id + ': Page messages div does not contain: "The registration was not successful!"');
            } 
        })
        .catch((err) => {
            console.error('---ERROR' + test_id + ': ', err.stack);
        })
        .finally(() => {
            return driver.quit();
        });
}

function testUserRegistrationPageFormSubmitWithIncorrectData(test_id) {
    const driver = getDriver();
    driver.get('https://theapp.artidas.hu/tavernraid/web/user/registration')
        .then(() => driver.findElement(By.name("nick_name")).sendKeys("TestUser"))
        .then(() => driver.findElement(By.name("email")).sendKeys("testuser@example.com"))
        .then(() => driver.findElement(By.name("password")).sendKeys("testpasswordX"))
        .then(() => driver.findElement(By.name("password_again")).sendKeys("testpasswordY"))
        .then(() => driver.findElement(By.name("birthday_at")).sendKeys("2030-01-01"))
        .then(() => driver.findElement(By.css("input[type=submit]")).click())
        .then(() => driver.wait(webdriver.until.elementLocated(webdriver.By.id('messages'))))
        .then(() => {
            return driver.findElement(webdriver.By.id('messages')).getText();
        })
        .then((messages_div_text) => {
            if (messages_div_text.includes('The registration was not successful!')) {
                console.log('///OK' + test_id + ': The div contains the string "The registration was not successful!"');
            } else {
                console.error('---ERROR' + test_id + ': Page messages div does not contain: "The registration was not successful!"');
            }
            if (messages_div_text.includes('A "Jelszó" mező nem felel meg a formai követelményeknek!')) {
                console.log('///OK' + test_id + ': The div contains the string "A "Jelszó" mező nem felel meg a formai követelményeknek!"');
            } else {
                console.error('---ERROR' + test_id + ': Page messages div does not contain: "A "Jelszó" mező nem felel meg a formai követelményeknek!"');
            }
            if (messages_div_text.includes('Az általad megadott jelszó és annak ismétlése nem egyezik!')) {
                console.log('///OK' + test_id + ': The div contains the string "Az általad megadott jelszó és annak ismétlése nem egyezik!"');
            } else {
                console.error('---ERROR' + test_id + ': Page messages div does not contain: "Az általad megadott jelszó és annak ismétlése nem egyezik!"');
            }
        })
        .catch((err) => {
            console.error('---ERROR' + test_id + ': ', err.stack);
        })
        .finally(() => {
            return driver.quit();
        });
}

