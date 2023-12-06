from fpdf import FPDF
from datetime import datetime
import requests
from settings import HEADERS_API, ENDPOINT_CLIENTE
# utilizado para tratar a imagem
import base64
import re
import os
from PIL import Image
from io import BytesIO
class PDF(FPDF):
    def header(self):
        self.image("scr/static/img/pizza.png", 10, 8, 20)
        self.set_font('helvetica', 'B', 15)
        self.cell(0, 5, 'Pastelaria do Zé', 0, 1, 'C', 0)
        self.ln(5)
    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.cell(0, 10, 'Página ' + str(self.page_no()) + '/{nb}', 0, 0, 'C')
    def listaTodos(self):
        pdf = PDF(orientation="P", unit="mm", format="A4")  # L paisagem, P retrato
        pdf.set_author("Coelho")
        pdf.set_title('Clientes')
        pdf.alias_nb_pages()  # mostra o número da página no rodapé
        pdf.add_page()

        # Mostra o cabeçalho
        pdf.set_font('helvetica', 'b', 12)
        pdf.cell(190, 5, 'Clientes', 0, 1, 'C', 0)
        pdf.set_font('helvetica', '', 6)
        pdf.cell(190, 4, "Emitido em: " + str(datetime.now()), 0, 1, 'R')
        pdf.ln(7)

        # Largura das colunas e altura das linhas
        col_width = 30  # Largura das colunas, ajuste conforme necessário
        row_height = 5  # Altura das linhas, ajuste conforme necessário

        # Monta tabela para mostrar os dados
        pdf.set_font('helvetica', 'B', 8)

        # Cabeçalhos das colunas
        pdf.cell(col_width, row_height, 'ID', 1, 0, 'L')
        pdf.cell(col_width, row_height, 'Nome', 1, 0, 'L')
        pdf.cell(col_width, row_height, 'Telefone', 1, 0, 'L')
        pdf.cell(col_width, row_height, 'CPF', 1, 0, 'L')
        pdf.cell(col_width, row_height, 'Compra fiado', 1, 0, 'L')
        pdf.cell(col_width, row_height, 'Dia fiado', 1, 1, 'L')  # Move para a próxima linha

        # Busca na API e mostra todos os dados
        pdf.set_font('helvetica', '', 8)
        try:
            response = requests.get(ENDPOINT_CLIENTE, headers=HEADERS_API)
            result = response.json()
            if (response.status_code != 200):
                raise Exception(result[0])

            for row in result[0]:
                pdf.cell(col_width, 5, str(row['id_cliente']), 1, 0, 'L')
                pdf.cell(col_width, 5, str(row['nome']), 1, 0, 'L')
                pdf.cell(col_width, 5, str(row['telefone']), 1, 0, 'L')
                pdf.cell(col_width, 5, str(row['cpf']), 1, 0, 'L')
                pdf.cell(col_width, 5, str(row['compra_fiado']), 1, 0, 'L')
                pdf.cell(col_width, 5, str(row['dia_fiado']), 1, 1, 'L')  # Move para a próxima linha


        except Exception as e:
            pdf.multi_cell(190, 5, 'ERRO: ' + str(e.args[0]), 1, 'J', False)
        # baixa o relatório criado
        pdf.output('scr/pdfClientes.pdf')