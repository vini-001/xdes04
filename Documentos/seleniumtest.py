from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
import time

# Configuração do webdriver
driver = webdriver.Safari()

# Função para lidar com alertas
def handle_alert():
    try:
        WebDriverWait(driver, 3).until(EC.alert_is_present())
        alert = driver.switch_to.alert
        alert.accept()
    except:
        pass

# Função para adicionar um aluno
def add_aluno(nome, cpf, endereco, email, contato, curso):
    driver.get('http://127.0.0.1:5500/cadastrar.html')
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'entidade')))
    select_entidade = Select(driver.find_element(By.ID, 'entidade'))
    select_entidade.select_by_visible_text('Aluno')
    time.sleep(0.5)  # Esperar a mudança dos campos

    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'nome'))).send_keys(nome)
    driver.find_element(By.ID, 'cpf').send_keys(cpf)
    driver.find_element(By.ID, 'endereco').send_keys(endereco)
    driver.find_element(By.ID, 'email').send_keys(email)
    driver.find_element(By.ID, 'contato').send_keys(contato)
    driver.find_element(By.ID, 'curso').send_keys(curso)

    driver.find_element(By.CSS_SELECTOR, 'form#cadastroForm button[type=submit]').click()
    time.sleep(0.1)
    handle_alert()  # Lidar com o alerta após o cadastro

# Função para adicionar um professor
def add_professor(nome, cpf, carteira, endereco, email, contato, titulos, especializacao):
    driver.get('http://127.0.0.1:5500/cadastrar.html')
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'entidade')))
    select_entidade = Select(driver.find_element(By.ID, 'entidade'))
    select_entidade.select_by_visible_text('Professor')
    time.sleep(0.5)  # Esperar a mudança dos campos

    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'nome'))).send_keys(nome)
    driver.find_element(By.ID, 'cpf').send_keys(cpf)
    driver.find_element(By.ID, 'carteira').send_keys(carteira)
    driver.find_element(By.ID, 'endereco').send_keys(endereco)
    driver.find_element(By.ID, 'email').send_keys(email)
    driver.find_element(By.ID, 'contato').send_keys(contato)
    driver.find_element(By.ID, 'titulos').send_keys(titulos)
    driver.find_element(By.ID, 'especializacao').send_keys(especializacao)

    driver.find_element(By.CSS_SELECTOR, 'form#cadastroForm button[type=submit]').click()
    time.sleep(0.1)
    handle_alert()  # Lidar com o alerta após o cadastro

# Função para adicionar uma turma
def add_turma(codigo, nomeTurma, alunos, horario, local, professor, status):
    driver.get('http://127.0.0.1:5500/cadastrar.html')
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'entidade')))
    select_entidade = Select(driver.find_element(By.ID, 'entidade'))
    select_entidade.select_by_visible_text('Turma')
    time.sleep(0.5)  # Esperar a mudança dos campos

    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'codigo'))).send_keys(codigo)
    driver.find_element(By.ID, 'nomeTurma').send_keys(nomeTurma)
    for aluno in alunos:
        select_element = driver.find_element(By.ID, 'alunos')
        all_options = select_element.find_elements(By.TAG_NAME, "option")
        for option in all_options:
            if option.text == aluno:
                option.click()
                break
    driver.find_element(By.ID, 'horario').send_keys(horario)
    driver.find_element(By.ID, 'local').send_keys(local)
    select_element = driver.find_element(By.ID, 'professor')
    all_options = select_element.find_elements(By.TAG_NAME, "option")
    for option in all_options:
        if option.text == professor:
            option.click()
            break
    driver.find_element(By.ID, 'status').send_keys(status)

    driver.find_element(By.CSS_SELECTOR, 'form#cadastroForm button[type=submit]').click()
    time.sleep(0.1)
    handle_alert()  # Lidar com o alerta após o cadastro

# Gerar 50 alunos
for i in range(1, 51):
    nome = f"Aluno {i}"
    cpf = f"{i:03d}.{i:03d}.{i:03d}-{i:02d}"
    endereco = f"Endereço {i}"
    email = f"aluno{i}@example.com"
    contato = f"{i:04d}-{i:04d}"
    curso = f"Curso {i}"
    add_aluno(nome, cpf, endereco, email, contato, curso)

# Gerar 10 professores
for i in range(1, 11):
    nome = f"Professor {i}"
    cpf = f"{400 + i:03d}.{400 + i:03d}.{400 + i:03d}-{i:02d}"
    carteira = f"CT{i}"
    endereco = f"Endereço {400 + i}"
    email = f"professor{i}@example.com"
    contato = f"{4000 + i:04d}-{4000 + i:04d}"
    titulos = f"Título {i}"
    especializacao = f"Especialização {i}"
    add_professor(nome, cpf, carteira, endereco, email, contato, titulos, especializacao)
    time.sleep(0.1)

# Adicionar 5 turmas
for i in range(1, 6):
    codigo = f"T{i:03d}"
    nomeTurma = f"Turma {i}"
    alunos = [f"Aluno {j}" for j in range(1, 11)]
    horario = f"Horário {i}"
    local = f"Local {i}"
    professor = f"Professor {i}"
    status = "ativo"
    add_turma(codigo, nomeTurma, alunos, horario, local, professor, status)
    time.sleep(0.1)

time.sleep(1000)
driver.quit()
