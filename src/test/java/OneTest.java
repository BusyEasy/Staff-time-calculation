import com.codeborne.selenide.Condition;
import javafx.beans.property.SetProperty;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;


import static com.codeborne.selenide.Condition.*;
import static com.codeborne.selenide.Selectors.by;

import static com.codeborne.selenide.Selenide.*;


public class OneTest {

    WebDriver driver = new FirefoxDriver();

    @Before
    public void setUp() throws Exception {

        System.setProperty("webdriver.geckodriver.driver", "geckodriver.exe");

        driver.get("http://localhost:8080/intership");
    }

    @Test
    public void AuthErrorPerson() throws Exception {

        driver.findElement(By.id("button")).click();
        driver.findElement(By.id("id-correct")).equals("Введите логин");
        driver.findElement(By.id("login")).sendKeys("Бекта");
        driver.findElement(By.id("button")).click();
        driver.findElement(By.id("id-correct")).equals("Введите пароль");
        driver.findElement(By.id("password")).sendKeys("111111");
        driver.findElement(By.id("button")).click();
        driver.findElement(By.id("id-correct")).equals("Неправильный логин или пароль");


    }



    @Test
    public void AuthCorrectPerson() throws Exception {

    driver.findElement(By.id("login")).sendKeys("Бектурганов_Олжас");
    driver.findElement(By.id("password")).sendKeys("111111");
    driver.findElement(By.id("button")).click();
    driver.findElement(By.className("modal")).isDisplayed();



    }

    @Test
    public void SaveFrom() throws Exception {

        driver.findElement(By.className("saveClass")).click();
        driver.findElement(By.id("message-save")).equals("Данные сохранены");


    }

    @After
    public void tearDown() throws Exception {
        driver.quit();
    }
}
