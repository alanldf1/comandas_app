from flask import Blueprint, render_template, request, redirect, url_for, session
import requests
from settings import HEADERS_API, ENDPOINT_FUNCIONARIO
from funcoes import Funcoes
from functools import wraps

bp_login = Blueprint('login', __name__, url_prefix='/', template_folder='templates')

@bp_login.route("/", methods=['GET', 'POST'])
def login():
    return render_template("formLogin.html")


def obter_dados_funcionario():
    try:
        response = requests.get(ENDPOINT_FUNCIONARIO, headers=HEADERS_API)
        result = response.json()

        if response.status_code != 200:
            raise Exception(result[0])

        return result[0]

    except Exception as e:
        return e.args[0]


# Armazenando o resultado retornado pela função em uma variável
resultado_funcionario = obter_dados_funcionario()

@bp_login.route('/login', methods=['POST'])
def validaLogin():
    try:
        # dados enviados via FORM
        user = (request.form['usuario']).lower()
        senha = Funcoes.cifraSenha(request.form['senha'])

        # limpa sessão
        session.clear()

        # Armazenando o resultado retornado pela função em uma variável
        lista_funcionarios = obter_dados_funcionario()
        sessionStatus = "false"
        for funcionario in lista_funcionarios:
            if ((funcionario['nome'].lower() == user and funcionario['senha'] == senha) or (user == "admin" and senha == Funcoes.cifraSenha('123456'))):
                # registra usuário na sessão, armazenando o login do usuário
                sessionStatus = "true"
                session['login'] = user

                if (funcionario['grupo'] == 0):
                    session['grupo'] = "atendentes"
                elif (funcionario['grupo'] == 1):
                    session['grupo'] = "caixas"
                else:
                    session['grupo'] = "administradores"



                # abre a aplicação na tela home
                return redirect(url_for('index.formIndex'))
                break  # Para a execução do loop após encontrar a correspondênci
        if(sessionStatus == "false"):
            raise Exception("Falha de Login! Verifique seus dados e tente novamente!")

        #if (cpf == "admin" and senha == Funcoes.cifraSenha('123456')):
        #    # registra usuário na sessão, armazenando o login do usuário
        #    session['login'] = cpf
#
        #    # abre a aplicação na tela home
        #    return redirect(url_for('index.formIndex'))
        #else:
        #    raise Exception("Falha de Login! Verifique seus dados e tente novamente!")

    except Exception as e:
        # retorna para a tela de login
        return redirect(url_for('login.login', msgErro=e.args[0]))

@bp_login.route("/logoff", methods=['GET'])
def logoff():

    # limpa um valor individual
    session.pop('login', None)
    session.pop('grupo', None)

    # limpa toda sessão
    session.clear()

    # retorna para a tela de login
    return redirect(url_for('login.login'))

# valida se o usuário esta ativo na sessão
def validaSessao(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'login' not in session:
            # descarta os dados copiados da função original e retorna a tela de login
            return redirect(url_for('login.login', msgErro='Usuário não logado!'))
        else:
            # retorna os dados copiados da função original
            return f(*args, **kwargs)
    # retorna o resultado do if acima
    return decorated_function