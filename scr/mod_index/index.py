from flask import Blueprint, render_template
from mod_login.login import validaSessao

bp_index = Blueprint('index', __name__, url_prefix="/home", template_folder='templates')

''' rotas dos formulários '''
@bp_index.route('/')
@validaSessao
def formIndex():
    return render_template('formIndex.html'), 200

'''
Rota antiga de app...
@app.route('/')
def formIndex():
    # return "<h1>Rota da página de Funcionários da nossa WEB APP</h1>", 200
    return render_template('formIndex.html'), 200
'''