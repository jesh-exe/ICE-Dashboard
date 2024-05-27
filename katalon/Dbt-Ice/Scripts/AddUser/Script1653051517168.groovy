import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static com.kms.katalon.core.testobject.ObjectRepository.findWindowsObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testng.keyword.TestNGBuiltinKeywords as TestNGKW
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.windows.keyword.WindowsBuiltinKeywords as Windows
import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.Keys as Keys

WebUI.click(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/a_Users'))

WebUI.click(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/button_Add New User'))

WebUI.setText(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/input_User Name_UDuserName'), 'sunil')

WebUI.setText(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/input_Email_UDEmail'), 'sunil@gmail.com')

WebUI.setEncryptedText(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/input_Password_UDPassword'), 
    'KKl2Byr2AAjffztXTFZPzw==')

WebUI.setEncryptedText(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/input_Confirm Password_UDConfPassword'), 
    'KKl2Byr2AAjffztXTFZPzw==')

WebUI.setText(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/input_FirstName_UDFirstName'), 
    'sunil')

WebUI.setText(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/input_LastName_UDLastName'), 'jamsandekar')

WebUI.click(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/button_Date of Birth_btn btn-primary feathe_74f6e5'))

WebUI.click(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/div_13'))

WebUI.click(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/label_Female'))

WebUI.setText(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/input_Contact Number_UDContactNumber'), 
    '9922256452')

WebUI.setText(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/input_Address Line1_addressLine1'), 
    'kolhapur')

WebUI.setText(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/input_Address Line2_addressLine2'), 
    'kolhapur')

WebUI.setText(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/input_Landmark_landmark'), 'gujari')

WebUI.setText(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/input_City_city'), 'kolhapur')

WebUI.setText(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/input_State_state'), 'maharashtra')

WebUI.setText(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/input_ZipCode_zipCode'), '416002')

WebUI.click(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/button_Register'))

WebUI.click(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/button_OK'))

WebUI.setText(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/input_Address Line1_addressLine1'), 
    'Gujari kolhapur')

WebUI.click(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/button_Register'))

WebUI.click(findTestObject('Object Repository/Page_DBT- Ingrated Computing Environment/button_OK'))

WebUI.closeBrowser()

