from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import unittest
import time

class SGTVTest(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Configura o ChromeDriver
        cls.driver = webdriver.Chrome()
        cls.driver.get("http://127.0.0.1:5500/Códigos/index.html")  # Certifique-se de que este URL está correto

    def test_cadastrar_alunos(self):
        driver = self.driver
        for i in range(1, 21):
            driver.find_element(By.LINK_TEXT, "Aluno").click()
            driver.find_element(By.LINK_TEXT, "Cadastrar Aluno").click()

            driver.find_element(By.ID, "cpf").send_keys(f"1234567890{i:02d}")
            time.sleep(0.01)
            driver.find_element(By.ID, "nome").send_keys(f"Teste Aluno {i}")
            time.sleep(0.01)
            driver.find_element(By.ID, "endereco").send_keys("Rua Exemplo, 123")
            time.sleep(0.01)
            driver.find_element(By.ID, "email").send_keys(f"teste{i}@exemplo.com")
            time.sleep(0.01)
            driver.find_element(By.ID, "contato").send_keys("999999999")
            time.sleep(0.01)
            driver.find_element(By.ID, "curso").send_keys("Curso Teste")
            time.sleep(0.01)
            driver.find_element(By.CSS_SELECTOR, "input[type='submit']").click()

            alert = WebDriverWait(driver, 10).until(EC.alert_is_present())
            self.assertEqual("Aluno cadastrado com sucesso!", alert.text)
            alert.accept()
            driver.get("http://127.0.0.1:5500/Códigos/index.html")

    def test_cadastrar_professores(self):
        driver = self.driver
        for i in range(1, 3):
            driver.find_element(By.LINK_TEXT, "Professor").click()
            driver.find_element(By.LINK_TEXT, "Cadastrar Professor").click()

            driver.find_element(By.ID, "cpf").send_keys(f"9876543210{i}")
            time.sleep(0.01)
            driver.find_element(By.ID, "nome").send_keys(f"Teste Professor {i}")
            time.sleep(0.01)
            driver.find_element(By.ID, "carteira").send_keys(f"CTPS{i}")
            time.sleep(0.01)
            driver.find_element(By.ID, "endereco").send_keys("Avenida Exemplo, 456")
            time.sleep(0.01)
            driver.find_element(By.ID, "email").send_keys(f"professor{i}@exemplo.com")
            time.sleep(0.01)
            driver.find_element(By.ID, "contato").send_keys("888888888")
            time.sleep(0.01)
            driver.find_element(By.ID, "titulos").send_keys("Doutor")
            time.sleep(0.01)
            driver.find_element(By.ID, "especializacao").send_keys("Matemática")
            time.sleep(0.01)
            driver.find_element(By.CSS_SELECTOR, "input[type='submit']").click()

            alert = WebDriverWait(driver, 10).until(EC.alert_is_present())
            self.assertEqual("Professor cadastrado com sucesso!", alert.text)
            alert.accept()
            driver.get("http://127.0.0.1:5500/Códigos/index.html")

    def test_cadastrar_turmas(self):
        driver = self.driver

        # Cadastrar Turma 1 com alunos 1 a 10
        driver.find_element(By.LINK_TEXT, "Turma").click()
        driver.find_element(By.LINK_TEXT, "Cadastrar Turma").click()
        driver.find_element(By.ID, "codigo").send_keys("TURMA1")
        time.sleep(0.01)
        driver.find_element(By.ID, "nome").send_keys("Turma 1")
        time.sleep(0.01)
        driver.find_element(By.ID, "curso").send_keys("Curso Teste")
        time.sleep(0.01)
        driver.find_element(By.ID, "local").send_keys("Sala 101")
        time.sleep(0.01)
        driver.find_element(By.ID, "periodo").send_keys("Manhã")
        time.sleep(0.01)
        driver.find_element(By.ID, "status").send_keys("Ativa")
        time.sleep(0.01)
        alunos_select = driver.find_element(By.ID, "alunos")
        for j in range(1, 11):
            alunos_select.find_element(By.XPATH, f"//option[@value='1234567890{j:02d}']").click()
        time.sleep(0.01)
        professor_select = driver.find_element(By.ID, "professor")
        professor_select.find_element(By.XPATH, f"//option[@value='98765432101']").click()
        time.sleep(0.01)
        driver.find_element(By.CSS_SELECTOR, "input[type='submit']").click()
        alert = WebDriverWait(driver, 10).until(EC.alert_is_present())
        self.assertEqual("Turma cadastrada com sucesso!", alert.text)
        alert.accept()

        # Cadastrar Turma 2 com alunos 11 a 20
        driver.find_element(By.LINK_TEXT, "Turma").click()
        driver.find_element(By.LINK_TEXT, "Cadastrar Turma").click()
        driver.find_element(By.ID, "codigo").send_keys("TURMA2")
        time.sleep(0.01)
        driver.find_element(By.ID, "nome").send_keys("Turma 2")
        time.sleep(0.01)
        driver.find_element(By.ID, "curso").send_keys("Curso Teste")
        time.sleep(0.01)
        driver.find_element(By.ID, "local").send_keys("Sala 102")
        time.sleep(0.01)
        driver.find_element(By.ID, "periodo").send_keys("Tarde")
        time.sleep(0.01)
        driver.find_element(By.ID, "status").send_keys("Ativa")
        time.sleep(0.01)
        alunos_select = driver.find_element(By.ID, "alunos")
        for j in range(11, 21):
            alunos_select.find_element(By.XPATH, f"//option[@value='1234567890{j:02d}']").click()
        time.sleep(0.01)
        professor_select = driver.find_element(By.ID, "professor")
        professor_select.find_element(By.XPATH, f"//option[@value='98765432102']").click()
        time.sleep(0.01)
        driver.find_element(By.CSS_SELECTOR, "input[type='submit']").click()
        alert = WebDriverWait(driver, 10).until(EC.alert_is_present())
        self.assertEqual("Turma cadastrada com sucesso!", alert.text)
        alert.accept()
        driver.get("http://127.0.0.1:5500/Códigos/index.html")

    def test_lancar_notas(self):
        driver = self.driver

        # Lançar notas para a primeira turma
        driver.find_element(By.LINK_TEXT, "Turma").click()
        driver.find_element(By.LINK_TEXT, "Lançar Nota").click()
        driver.find_element(By.ID, "codigo").send_keys("TURMA1")
        time.sleep(0.01)
        driver.find_element(By.ID, "atividade").send_keys("Atividade 1")
        time.sleep(0.01)
        driver.find_element(By.ID, "codigo").send_keys(Keys.TAB)  # Dispara o evento 'blur' para carregar alunos

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "alunosContainer"))
        )

        for i in range(1, 11):
            driver.find_element(By.NAME, f"nota_1234567890{i:02d}").send_keys(str(int(10 - i * 0.5)))
            time.sleep(0.01)

        driver.find_element(By.CSS_SELECTOR, "input[type='submit']").click()

        alert = WebDriverWait(driver, 10).until(EC.alert_is_present())
        self.assertEqual("Notas lançadas com sucesso!", alert.text)
        alert.accept()

        # Verificar se o formulário foi limpo
        self.assertEqual(driver.find_element(By.ID, "codigo").get_attribute("value"), "")

        # Lançar notas para a segunda turma
        driver.find_element(By.LINK_TEXT, "Turma").click()
        driver.find_element(By.LINK_TEXT, "Lançar Nota").click()
        driver.find_element(By.ID, "codigo").send_keys("TURMA2")
        time.sleep(0.1)
        driver.find_element(By.ID, "codigo").send_keys(Keys.TAB)  # Dispara o evento 'blur' para carregar alunos
        time.sleep(0.1)
        driver.find_element(By.ID, "atividade").send_keys("Atividade 2")
        time.sleep(0.01)

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "alunosContainer"))
        )

        for i in range(11, 21):
            driver.find_element(By.NAME, f"nota_1234567890{i:02d}").send_keys(str(int(10 - (i - 10) * 0.5)))
            time.sleep(0.01)

        driver.find_element(By.CSS_SELECTOR, "input[type='submit']").click()

        alert = WebDriverWait(driver, 10).until(EC.alert_is_present())
        self.assertEqual("Notas lançadas com sucesso!", alert.text)
        alert.accept()

        # Verificar se o formulário foi limpo
        self.assertEqual(driver.find_element(By.ID, "codigo").get_attribute("value"), "")
        self.assertEqual(driver.find_element(By.ID, "atividade").get_attribute("value"), "")
        self.assertEqual(driver.find_element(By.ID, "alunosContainer").text, "")

    @classmethod
    def tearDownClass(cls):
        # Delay de 300 segundos antes de fechar a janela do navegador
        time.sleep(300)
        cls.driver.quit()

if __name__ == "__main__":
    unittest.main()
