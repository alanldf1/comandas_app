from flask import Blueprint, render_template, request
import requests
from settings import HEADERS_API, ENDPOINT_FUNCIONARIO

bp_funcionario = Blueprint('funcionario', __name__, url_prefix="/funcionario", template_folder='templates')

''' rotas dos formulários '''
@bp_funcionario.route('/', methods=['GET', 'POST'])
def formListaFuncionario():
    try:
        response = requests.get(ENDPOINT_FUNCIONARIO, headers=HEADERS_API)
        result = response.json()
        if (response.status_code != 200):
            raise Exception(result[0])
        return render_template('formListaFuncionario.html', result=result[0])
    except Exception as e:
        return render_template('formListaFuncionario.html', msgErro=e.args[0])
    
@bp_funcionario.route('/cadastro-funcionario/', methods=['GET'])
def formFuncionario():
    return render_template('formFuncionario.html')

'''
Rota antiga de app...
@app.route('/funcionario/')
def formListaFuncionario():
    # return "<h1>Rota da página de Funcionários da nossa WEB APP</h1>", 200
    return render_template('formListaFuncionario.html'), 200
'''