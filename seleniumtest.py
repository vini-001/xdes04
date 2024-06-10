from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import random

# Configuração do webdriver
driver = webdriver.Safari()

# Função para adicionar um aluno
def add_aluno(nome, cpf, telefone, perfil, email, senha):
    driver.get('http://127.0.0.1:5501/cadastro-aluno.html')  

    driver.find_element(By.ID, 'nome-aluno').send_keys(nome)
    driver.find_element(By.ID, 'cpf-aluno').send_keys(cpf)
    driver.find_element(By.ID, 'telefone-aluno').send_keys(telefone)
    driver.find_element(By.ID, 'perfil-aluno').send_keys(perfil)
    driver.find_element(By.ID, 'email-aluno').send_keys(email)
    driver.find_element(By.ID, 'senha-aluno').send_keys(senha)

    driver.find_element(By.CSS_SELECTOR, 'form#form-aluno button[type=submit]').click()
    time.sleep(0.1)

# Função para adicionar um professor
def add_professor(nome, cpf, telefone, perfil, email, senha):
    driver.get('http://127.0.0.1:5501/cadastro-professor.html')

    driver.find_element(By.ID, 'nome-professor').send_keys(nome)
    driver.find_element(By.ID, 'cpf-professor').send_keys(cpf)
    driver.find_element(By.ID, 'telefone-professor').send_keys(telefone)
    driver.find_element(By.ID, 'perfil-professor').send_keys(perfil)
    driver.find_element(By.ID, 'email-professor').send_keys(email)
    driver.find_element(By.ID, 'senha-professor').send_keys(senha)

    driver.find_element(By.CSS_SELECTOR, 'form#form-professor button[type=submit]').click()
    time.sleep(0.1)

# Função para adicionar uma turma
def add_turma(codigo, nome, alunos, horario, local, professor, status):
    driver.get('http://127.0.0.1:5501/cadastro-turma.html')

    driver.find_element(By.ID, 'codigo-turma').send_keys(codigo)
    driver.find_element(By.ID, 'nome-turma').send_keys(nome)
    for aluno in alunos:
        driver.find_element(By.ID, 'alunos-participantes').send_keys(aluno)
        driver.find_element(By.ID, 'alunos-participantes').send_keys(Keys.ENTER)
    driver.find_element(By.ID, 'horario-aulas').send_keys(horario)
    driver.find_element(By.ID, 'local-aulas').send_keys(local)
    driver.find_element(By.ID, 'professor-responsavel').send_keys(professor)
    driver.find_element(By.ID, 'status-turma').send_keys(status)

    driver.find_element(By.CSS_SELECTOR, 'form#form-turma button[type=submit]').click()
    time.sleep(0.1)

# Gerar 100 alunos
for i in range(1, 51):
    nome = f"Aluno {i}"
    cpf = f"{i:03d}.{i:03d}.{i:03d}-{i:02d}"
    telefone = f"{i:04d}-{i:04d}"
    perfil = f"Perfil {chr(65 + (i % 26))}"
    email = f"aluno{i}@example.com"
    senha = f"senha{i}"
    add_aluno(nome, cpf, telefone, perfil, email, senha)

# Gerar 10 professores
for i in range(1, 11):
    nome = f"Professor {i}"
    cpf = f"{400 + i:03d}.{400 + i:03d}.{400 + i:03d}-{i:02d}"
    telefone = f"{4000 + i:04d}-{4000 + i:04d}"
    perfil = f"Perfil {chr(65 + (i % 26))}"
    email = f"professor{i}@example.com"
    senha = f"senha{i + 100}"
    add_professor(nome, cpf, telefone, perfil, email, senha)


    time.sleep(100000)
