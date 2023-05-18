using CadastrarAtletas.Model;
using CadastrarAtletas.View;
using ClassDados;
using ClassGenerica;
using Guna.UI2.WinForms;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Windows.Forms;

namespace Cadastro.View
{
    public partial class FrmCadCorredores : Form
    {
        public bool bAdmin = false;
        public string sTitulo = "Atletas Cadastrados";
        private ClasseDml2 cmdBD = new ClasseDml2();
        private Atleta atleta = new Atleta();
        private DataSet ds = new DataSet();
        private string sParam = "";
        private string sPes = "NomAtleta";
        private Messagens.ClsMessagens Clmsg = new Messagens.ClsMessagens();
        public bool bStart = false;
        public string sCodUsr = "1";
        private Color clr1 = Color.FromArgb(88, 128, 180);
        private RotinasFormWindows cmfw = new RotinasFormWindows();

        // objeto conection de banco
        public SqlConnection Connection;

        //variaveis locais
        private bool bNovo = false;

        private bool bAlte = false;

        // Bindsource de dados
        private BindingSource bdsDados = new BindingSource();

        public bool bEncerrado = false;

        public FrmCadCorredores()
        {
            InitializeComponent();
            //   lblId.Visible= false;
        }

        public void BloqueiaForms()
        {
            FrmCadCorredores frmCad = new FrmCadCorredores();
            frmCad.Enabled = false;
        }

        private void FrmComerciais_Load(object sender, EventArgs e)
        {
            lblStatus.Text = sTitulo;

            atleta.updatBds(ref bdsDados, "PPSeAtletas", "");

            // Monta a Grid
           // cmfw.CriaGrid(ref dtgDados, "Cod", "CodAtleta", 40, DataGridViewContentAlignment.MiddleCenter);
            cmfw.CriaGrid(ref dtgDados, "Nome", "Nome", 200);
            cmfw.CriaGrid(ref dtgDados, "CPF", "Cpf", 100);
            cmfw.CriaGrid(ref dtgDados, "Nascimento", "Nascimento", 90);
            cmfw.CriaGrid(ref dtgDados, "Sexo", "Sexo", 60);
            cmfw.CriaGrid(ref dtgDados, "Civil", "EstadoCivil", 90);
            cmfw.CriaGrid(ref dtgDados, "Email", "Email", 180);
            cmfw.CriaGrid(ref dtgDados, "Telefone", "Telefone", 100);
            cmfw.CriaGrid(ref dtgDados, "Categoria", "Categoria", 90);
            cmfw.CriaGrid(ref dtgDados, "Logradouro", "Logradouro", 180);
            cmfw.CriaGrid(ref dtgDados, "N:", "Numero", 40);
            cmfw.CriaGrid(ref dtgDados, "Municipio", "Municipio", 100);
            cmfw.CriaGrid(ref dtgDados, "Bairro", "Bairro", 170);
            cmfw.CriaGrid(ref dtgDados, "UF", "UF", 30);
            cmfw.CriaGrid(ref dtgDados, "Cep", "Cep", 80);
            cmfw.CriaGrid(ref dtgDados, "Complemento", "Complemento", 140);
            cmfw.CriaGrid(ref dtgDados, "TAG", "TAG", 100);
           
     

            // Passo os dados para os campos
            cmfw.setLista(ref lblId, "Text", ref bdsDados, "CodAtleta");
            cmfw.setLista(ref txtNome, "Text", ref bdsDados, "Nome");
            cmfw.setLista(ref txtCpf, "Text", ref bdsDados, "Cpf");
            cmfw.setLista(ref txtNascimento, "Text", ref bdsDados, "Nascimento");
            cmfw.setLista(ref cbSexo, "Text", ref bdsDados, "Sexo");
            cmfw.setLista(ref cbEstadoCivil, "Text", ref bdsDados, "EstadoCivil");
            cmfw.setLista(ref txtTelefone, "Text", ref bdsDados, "Telefone");
            cmfw.setLista(ref cbCategoria, "Text", ref bdsDados, "Categoria");
            cmfw.setLista(ref txtEmail, "Text", ref bdsDados, "Email");
            cmfw.setLista(ref txtLogradouro, "Text", ref bdsDados, "Logradouro");
            cmfw.setLista(ref txtNumero, "Text", ref bdsDados, "Numero");
            cmfw.setLista(ref txtBairro, "Text", ref bdsDados, "Bairro");
            cmfw.setLista(ref txtMunicipio, "Text", ref bdsDados, "Municipio");
            cmfw.setLista(ref cbUF, "Text", ref bdsDados, "UF");
            cmfw.setLista(ref txtCep, "Text", ref bdsDados, "Cep");
            cmfw.setLista(ref txtComplemento, "Text", ref bdsDados, "Complemento");
            cmfw.setLista(ref txtTag, "Text", ref bdsDados, "TAG");

            dtgDados.AutoGenerateColumns = false;
            dtgDados.DataSource = bdsDados;
            btnDel.Enabled = (bdsDados.Count > 0);
            gpDado.Enabled = btnDel.Enabled;
            gpTags.Enabled = false;

            //confere se o campo tag do atleta esta nulo, para liberar ou não a edição
            DataGridViewRow linhaAtual = dtgDados.CurrentRow;
            int linha = linhaAtual.Index;

            if (dtgDados.Rows[linha].Cells[14].Value.ToString() == "")
            {
                gpTags.Enabled = true;
                btnSalvarTag.Enabled = false;
                btnEditarTag.Enabled = false;
                txtTag.Enabled = true;
            }
            else
            {
                gpTags.Enabled = true;
                btnSalvarTag.Enabled = false;
                btnEditarTag.Enabled = true;
                txtTag.Enabled = false;
            }
        }

        private void btnPrimeiro_Click(object sender, EventArgs e)
        {
            bdsDados.MoveFirst();
            lblStatus.Text = "Primeiro Registro" + sTitulo;
        }

        private void btnAnterior_Click(object sender, EventArgs e)
        {
            bdsDados.MovePrevious();
        }

        private void bntProximo_Click(object sender, EventArgs e)
        {
            bdsDados.MoveNext();
        }

        private void btnUltimo_Click(object sender, EventArgs e)
        {
            bdsDados.MoveLast();
            lblStatus.Text = "Ultimo Registro" + sTitulo;
        }

        private void btnNovo_Click(object sender, EventArgs e)
        {
            bdsDados.AddNew();
            bNovo = true;
            gpDado.Enabled = true;
            txtNome.Focus();
            lblStatus.Text = "Novo Cadastro";
            cmfw.Resetcor(gpDado.Controls);
            gpTags.Enabled = false;
        }

        private void btnDel_Click(object sender, EventArgs e)
        {
            FrmCadCorredores frmCad = new FrmCadCorredores();
            btnSalva.Enabled = true;
            cmfw.Resetcor(gpDado.Controls);
            cmfw.Resetcor(gpEndereco.Controls);
            cmfw.Resetcor(gpTags.Controls);

            atleta.DeletarAtleta(bNovo, bAlte, btnDel, btnSalva, btnNovo, bdsDados, lblId.Text, dtgDados, frmCad);

            bAlte = false;
            bNovo = false;
            btnSalva.Enabled = false;
            dtgDados.Refresh();
            dtgDados.Enabled = true;
            btnDel.Text = "&Excluir";
            btnDel.Enabled = true;
            btnNovo.Enabled = true;
            btnDel.Enabled = (bdsDados.Count > 0);
            lblStatus.Text = sTitulo;
        }

        private bool IsNumeric(int Val)
        {
            return ((Val >= 96 && Val <= 105) || (Val >= 48 && Val <= 57) || (Val == 8) || (Val == 46));
        }

        private void btnSalva_Click(object sender, EventArgs e)
        {
         

            //passo os campos do cadastro para validação
            atleta = new Atleta(txtNome.Text.Trim(),txtCpf.Text,txtNascimento.Text.Trim(),cbSexo.Text.Trim(),cbEstadoCivil.Text.Trim(),txtEmail.Text.Trim(),cbCategoria.Text.Trim(),txtLogradouro.Text.Trim(),
                txtNumero.Text.Trim(),txtBairro.Text.Trim(),txtMunicipio.Text.Trim(),cbUF.Text.Trim(),txtComplemento.Text.Trim(), txtTelefone.Text.Trim());

            List<ValidationResult> listErros = new List<ValidationResult>();//lista para capturar erros e armazenar
            ValidationContext contect = new ValidationContext(atleta); // passa o obj que sera validado

            if (!Validator.TryValidateObject(atleta, contect, listErros, true))
            {
                StringBuilder sb = new StringBuilder(); // vai armazenar as mensagens de erro

                foreach (ValidationResult erro in listErros) // percorre a lista de erro e captura os erros
                {
                    sb.Append(erro.ErrorMessage + "\n");
                }
                MessageBox.Show(sb.ToString()); // passas as mensagens de erro para label// recebe as mensagens de erro
            }
            else
            {
                try //validação ok
                {
                    if (!bNovo)
                    {
                        Clmsg.frmP.sMsg = "Confirmar Alteraçao???";
                        if (!Clmsg.frmP.bConf)
                        {
                            dtgDados.Enabled = true;
                            return;
                        }
                    }
                    sParam = "'" + txtNome.Text.Trim() + "'";
                    sParam += ",'" + txtCpf.Text.Replace(",", "").Replace("-", "") + "'";
                    sParam += ",'" + txtNascimento.Text.Trim() + "'";
                    sParam += ",'" + cbSexo.Text.Trim() + "'";
                    sParam += ",'" + cbEstadoCivil.Text.Trim() + "'";
                    sParam += ",'" + txtEmail.Text.Trim() + "'";
                    sParam += ",'" + txtTelefone.Text.Trim() + "'";
                    sParam += ",'" + cbCategoria.Text.Trim() + "'";
                    sParam += ",'" + txtLogradouro.Text.Trim() + "'";
                    sParam += ",'" + txtNumero.Text.Trim() + "'";
                    sParam += ",'" + txtBairro.Text.Trim() + "'";
                    sParam += ",'" + txtMunicipio.Text.Trim() + "'";
                    sParam += ",'" + cbUF.Text.Trim() + "'";
                    sParam += ",'" + txtCep.Text.Trim() + "'";
                    sParam += ",'" + txtComplemento.Text.Trim() + "'";

                    if (atleta.CadastrarAtleta(bNovo, bdsDados, sParam, lblId.Text))
                    {
                        gpTags.Enabled = true;
                        btnSalvarTag.Enabled = false;
                        btnEditarTag.Enabled = false;
                        txtTag.Enabled = true;

                        //if (txtTag.Text == "")
                        //{
                        //    btnSalvarTag.Enabled = true;
                        //    btnEditarTag.Enabled = false;
                        //}
                        //else
                        //{
                        //    btnSalvarTag.Enabled = false;
                        //    btnEditarTag.Enabled = true;
                        //}
                    }
                    else
                    {
                        btnNovo.Enabled = false;
                        return;
                    }
                    dtgDados.Refresh();
                    dtgDados.Enabled = true;
                    btnDel.Text = "&Excluir";
                    btnDel.Enabled = true;
                    btnNovo.Enabled = true;
                    cmfw.Resetcor(gpDado.Controls);
                    cmfw.Resetcor(gpEndereco.Controls);
                    lblStatus.Text = sTitulo;
                    bNovo = false;
                    bAlte = false;
                    btnSalva.Enabled = false;
                }
                catch (System.Exception ex)
                {
                    MessageBox.Show("Erro: \r\n" + ex.Message, "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private void validaText2(object sender, KeyEventArgs e)
        {
        }

        private void FrmProgramas_FormClosing(object sender, FormClosingEventArgs e)
        {
            bEncerrado = true;
        }

        private void btnPrimeiro_MouseEnter(object sender, EventArgs e)
        {
            ((Button)(sender)).BackColor = Color.LightGreen;
            ((Button)(sender)).Cursor = Cursors.Hand;
        }

        private void btnPrimeiro_MouseLeave(object sender, EventArgs e)
        {
            ((Button)(sender)).BackColor = Color.Transparent;//clr1;
            ((Button)(sender)).Cursor = Cursors.Default;
        }

        //void alteracaoTeste(ref ComboBox cbo)
        //{
        //    Int64 iCod = Convert.ToInt64(lblId.Text);
        //    {
        //        bAlte = true;
        //        btnSalva.Enabled = true;
        //        //btnDel.Enabled = true;
        //        dtgDados.Enabled = false;
        //        MudaCor(ref cbo);
        //        bAlte = true;
        //        lblStatus.Text = "Alteração " + sTitulo;
        //        btnDel.Text = "&Cancelar";
        //        btnDel.Enabled = true;
        //    }
        //}

        private void FrmComerciais_FormClosing(object sender, FormClosingEventArgs e)
        {
            bEncerrado = true;
        }

        private void mudaCor(Object sender)
        {
            if (!bNovo)
            {
                string sTipo = sender.GetType().ToString();
                if (sTipo.Contains("MaskedTextBox"))
                {
                    ((MaskedTextBox)sender).ForeColor = Color.Turquoise;
                    bAlte = true;
                }
                else if (sTipo.Contains("TextBox"))
                {
                    ((Guna2TextBox)sender).ForeColor = Color.Turquoise;
                    bAlte = true;
                }
                else if (sTipo.Contains("ComboBox"))
                {
                    ((Guna2ComboBox)sender).ForeColor = Color.Turquoise;
                    bAlte = true;
                }
            }
        }


        private void label12_Click(object sender, EventArgs e)
        {
        }

        private void label8_Click(object sender, EventArgs e)
        {
        }

        private void label10_Click(object sender, EventArgs e)
        {
        }

        private void lblStatus_Click(object sender, EventArgs e)
        {
        }

        private void label14_Click(object sender, EventArgs e)
        {
        }

        private void label9_Click(object sender, EventArgs e)
        {
        }

        private void lblStatus_Click_1(object sender, EventArgs e)
        {
        }

        private void lblId_Click(object sender, EventArgs e)
        {
        }

        private void label11_Click(object sender, EventArgs e)
        {
        }

        private void txtTag_TextChanged(object sender, EventArgs e)
        {
            btnSalvarTag.Enabled = true;
        }

        private void btnEditarTag_Click(object sender, EventArgs e)
        {
            Clmsg.frmP.sMsg = "Confirmar Alteraçao da TAG?";
            if (Clmsg.frmP.bConf)
            {
                Thread thread = new Thread(() => { Application.Run(new FrmEditarTag(lblId.Text, bdsDados)); });
                thread.Priority = ThreadPriority.Normal;
                thread.ApartmentState = ApartmentState.STA;
                thread.Start();
            }
            else
            {
                dtgDados.Enabled = true;
                return;
            }
        }

        private void dtgDados_Click(object sender, EventArgs e)
        {
        }

        private void dtgDados_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            atleta.updatBds(ref bdsDados, "PPSeAtletas", "");

            DataGridViewRow linhaAtual = dtgDados.CurrentRow;
            int linha = linhaAtual.Index;

            if (dtgDados.Rows[linha].Cells[15].Value.ToString() == string.Empty)
            {
                gpTags.Enabled = true;
                btnSalvarTag.Enabled = false;
                btnEditarTag.Enabled = false;
                txtTag.Enabled = true;
            }
            else
            {
                gpTags.Enabled = true;
                btnSalvarTag.Enabled = false;
                btnEditarTag.Enabled = true;
                txtTag.Enabled = false;
            }
        }

        private void guna2Button1_Click(object sender, EventArgs e)
        {
            bdsDados.MovePrevious();
        }

        private void btnProximo_Click(object sender, EventArgs e)
        {
            bdsDados.MoveNext();
        }

        private void guna2Button2_Click(object sender, EventArgs e)
        {
            bdsDados.MoveLast();
            lblStatus.Text = "Ultimo Registro" + sTitulo;
        }

        private void btnNovo_Click_1(object sender, EventArgs e)
        {
            bdsDados.AddNew();
            bNovo = true;
            gpDado.Enabled = true;
            txtNome.Focus();
            lblStatus.Text = "Novo Cadastro";
            cmfw.Resetcor(gpDado.Controls);
            gpTags.Enabled = false;
        }

        private void guna2Button4_Click(object sender, EventArgs e)
        {
            //passo os campos do cadastro para validação
          
            }

        private void btnSalvar_Click(object sender, EventArgs e)
        {
            atleta = new Atleta(txtNome.Text.Trim(), txtCpf.Text, txtNascimento.Text.Trim(), cbSexo.Text.Trim(), cbEstadoCivil.Text.Trim(), txtEmail.Text.Trim(), cbCategoria.Text.Trim(), txtLogradouro.Text.Trim(),
              txtNumero.Text.Trim(), txtBairro.Text.Trim(), txtMunicipio.Text.Trim(), cbUF.Text.Trim(), txtComplemento.Text.Trim(), txtTelefone.Text.Trim());

            List<ValidationResult> listErros = new List<ValidationResult>();//lista para capturar erros e armazenar
            ValidationContext contect = new ValidationContext(atleta); // passa o obj que sera validado

            if (!Validator.TryValidateObject(atleta, contect, listErros, true))
            {
                StringBuilder sb = new StringBuilder(); // vai armazenar as mensagens de erro

                foreach (ValidationResult erro in listErros) // percorre a lista de erro e captura os erros
                {
                    sb.Append(erro.ErrorMessage + "\n");
                }
                MessageBox.Show(sb.ToString()); // passas as mensagens de erro para label// recebe as mensagens de erro
            }
            else
            {
                try //validação ok
                {
                    if (!bNovo)
                    {
                        Clmsg.frmP.sMsg = "Confirmar Alteraçao???";
                        if (!Clmsg.frmP.bConf)
                        {
                            dtgDados.Enabled = true;
                            return;
                        }
                    }
                    sParam = "'" + txtNome.Text.Trim() + "'";
                    sParam += ",'" + txtCpf.Text.Replace(",", "").Replace("-", "") + "'";
                    sParam += ",'" + txtNascimento.Text.Trim() + "'";
                    sParam += ",'" + cbSexo.Text.Trim() + "'";
                    sParam += ",'" + cbEstadoCivil.Text.Trim() + "'";
                    sParam += ",'" + txtEmail.Text.Trim() + "'";
                    sParam += ",'" + txtTelefone.Text.Trim() + "'";
                    sParam += ",'" + cbCategoria.Text.Trim() + "'";
                    sParam += ",'" + txtLogradouro.Text.Trim() + "'";
                    sParam += ",'" + txtNumero.Text.Trim() + "'";
                    sParam += ",'" + txtBairro.Text.Trim() + "'";
                    sParam += ",'" + txtMunicipio.Text.Trim() + "'";
                    sParam += ",'" + cbUF.Text.Trim() + "'";
                    sParam += ",'" + txtCep.Text.Trim() + "'";
                    sParam += ",'" + txtComplemento.Text.Trim() + "'";

                    if (atleta.CadastrarAtleta(bNovo, bdsDados, sParam, lblId.Text))
                    {
                        gpTags.Enabled = true;
                        btnSalvarTag.Enabled = false;
                        btnEditarTag.Enabled = false;
                        txtTag.Enabled = true;

                        //if (txtTag.Text == "")
                        //{
                        //    btnSalvarTag.Enabled = true;
                        //    btnEditarTag.Enabled = false;
                        //}
                        //else
                        //{
                        //    btnSalvarTag.Enabled = false;
                        //    btnEditarTag.Enabled = true;
                        //}
                    }
                    else
                    {
                        btnNovo.Enabled = false;
                        return;
                    }
                    dtgDados.Refresh();
                    dtgDados.Enabled = true;
                    btnDel.Text = "&Excluir";
                    btnDel.Enabled = true;
                    btnNovo.Enabled = true;
                    cmfw.Resetcor(gpDado.Controls);
                    cmfw.Resetcor(gpEndereco.Controls);
                    cmfw.Resetcor(gpTags.Controls);
                    lblStatus.Text = sTitulo;
                    bNovo = false;
                    bAlte = false;
                    btnSalva.Enabled = false;
                }
                catch (System.Exception ex)
                {
                    MessageBox.Show("Erro: \r\n" + ex.Message, "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private void guna2Button6_Click(object sender, EventArgs e)
        {
            FrmCadCorredores frmCad = new FrmCadCorredores();
            btnSalva.Enabled = true;
            cmfw.Resetcor(gpDado.Controls);
            cmfw.Resetcor(gpEndereco.Controls);
            cmfw.Resetcor(gpTags.Controls);

            atleta.DeletarAtleta(bNovo, bAlte, btnDel, btnSalva, btnNovo, bdsDados, lblId.Text, dtgDados, frmCad);

            bAlte = false;
            bNovo = false;
            btnSalva.Enabled = false;
            dtgDados.Refresh();
            dtgDados.Enabled = true;
            btnDel.Text = "&Excluir";
            btnDel.Enabled = true;
            btnNovo.Enabled = true;
            btnDel.Enabled = (bdsDados.Count > 0);
            lblStatus.Text = sTitulo;
        }

        private void btnPrimeiro_Click_1(object sender, EventArgs e)
        {
            bdsDados.MoveFirst();
            lblStatus.Text = "Primeiro Registro" + sTitulo;
        }

        private void guna2GroupBox1_Click(object sender, EventArgs e)
        {

        }

        private void cbCategoria_SelectedIndexChanged(object sender, EventArgs e)
        {
            //mudaCor(cbCategoria);
            //if (!bNovo)
            //{
            //    btnSalva.Enabled = true;
            //    dtgDados.Enabled = false;
            //    btnNovo.Enabled = false;
            //    bAlte = true;
            //    btnDel.Text = "&Cancelar";
            //}
        }

        private void gpDado_Click(object sender, EventArgs e)
        {

        }

        private void txtNome_KeyPress(object sender, KeyPressEventArgs e)
        {
            mudaCor(txtNome);
            btnSalva.Enabled = true;
            if (!bNovo)
                lblStatus.Text = "Alteração " + sTitulo;
        }

        private void txtNome_KeyUp(object sender, KeyEventArgs e)
        {
            mudaCor(txtNome);
            if (!bNovo)
            {
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                bAlte = true;
                btnDel.Text = "&Cancelar";
            }
        }

        private void txtCpf_KeyUp(object sender, KeyEventArgs e)
        {
            mudaCor(txtCpf);
            if (!bNovo)
            {
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                bAlte = true;
                btnDel.Text = "&Cancelar";
            }
        }

        private void txtCpf_KeyPress(object sender, KeyPressEventArgs e)
        {
            mudaCor(txtCpf);
            btnSalva.Enabled = true;
            if (!bNovo)
                lblStatus.Text = "Alteração " + sTitulo;
        }

        private void txtNascimento_KeyPress(object sender, KeyPressEventArgs e)
        {
            mudaCor(txtNascimento);
            btnSalva.Enabled = true;
            if (!bNovo)
                lblStatus.Text = "Alteração " + sTitulo;
        }

        private void txtNascimento_KeyUp(object sender, KeyEventArgs e)
        {
            mudaCor(txtNascimento);
            if (!bNovo)
            {
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                bAlte = true;
                btnDel.Text = "&Cancelar";
            }
        }

        private void cbSexo_Click(object sender, EventArgs e)
        {

        }

        private void cbCategoria_Click(object sender, EventArgs e)
        {

        }

        private void cbEstadoCivil_Click(object sender, EventArgs e)
        {

        }

        private void txtEmail_KeyPress(object sender, KeyPressEventArgs e)
        {
            mudaCor(txtEmail);
            btnSalva.Enabled = true;
            if (!bNovo)
                lblStatus.Text = "Alteração " + sTitulo;
        }

        private void txtEmail_KeyUp(object sender, KeyEventArgs e)
        {
            mudaCor(txtEmail);
            if (!bNovo)
            {
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                bAlte = true;
                btnDel.Text = "&Cancelar";
            }
        }

        private void txtTelefone_KeyPress(object sender, KeyPressEventArgs e)
        {
            mudaCor(txtTelefone);
            btnSalva.Enabled = true;
            if (!bNovo)
                lblStatus.Text = "Alteração " + sTitulo;
        }

        private void txtTelefone_KeyUp(object sender, KeyEventArgs e)
        {
            mudaCor(txtTelefone);
            if (!bNovo)
            {
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                bAlte = true;
                btnDel.Text = "&Cancelar";
            }
        }

        private void txtLogradouro_KeyPress(object sender, KeyPressEventArgs e)
        {
            mudaCor(txtLogradouro);
            btnSalva.Enabled = true;
            if (!bNovo)
                lblStatus.Text = "Alteração " + sTitulo;
        }

        private void txtLogradouro_KeyUp(object sender, KeyEventArgs e)
        {
            mudaCor(txtLogradouro);
            if (!bNovo)
            {
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                bAlte = true;
                btnDel.Text = "&Cancelar";
            }
        }

        private void txtNumero_KeyPress(object sender, KeyPressEventArgs e)
        {
            mudaCor(txtNumero);
            btnSalva.Enabled = true;
            if (!bNovo)
                lblStatus.Text = "Alteração " + sTitulo;
        }

        private void txtNumero_KeyUp(object sender, KeyEventArgs e)
        {
            mudaCor(txtNumero);
            if (!bNovo)
            {
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                bAlte = true;
                btnDel.Text = "&Cancelar";
            }
        }

        private void txtBairro_KeyPress(object sender, KeyPressEventArgs e)
        {
            mudaCor(txtBairro);
            btnSalva.Enabled = true;
            if (!bNovo)
                lblStatus.Text = "Alteração " + sTitulo;
        }

        private void txtBairro_KeyUp(object sender, KeyEventArgs e)
        {
            mudaCor(txtBairro);
            if (!bNovo)
            {
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                bAlte = true;
                btnDel.Text = "&Cancelar";
            }
        }

        private void txtMunicipio_KeyPress(object sender, KeyPressEventArgs e)
        {
            mudaCor(txtMunicipio);
            btnSalva.Enabled = true;
            if (!bNovo)
                lblStatus.Text = "Alteração " + sTitulo;
        }

        private void txtMunicipio_KeyUp(object sender, KeyEventArgs e)
        {
            mudaCor(txtMunicipio);
            if (!bNovo)
            {
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                bAlte = true;
                btnDel.Text = "&Cancelar";
            }
        }

        private void cbUF_Click(object sender, EventArgs e)
        {
            mudaCor(cbUF);
            if (!bNovo)
            {
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                bAlte = true;
                btnDel.Text = "&Cancelar";
            }
        }

        private void txtCep_KeyPress(object sender, KeyPressEventArgs e)
        {
            mudaCor(txtCep);
            btnSalva.Enabled = true;
            if (!bNovo)
                lblStatus.Text = "Alteração " + sTitulo;
        }

        private void txtCep_KeyUp(object sender, KeyEventArgs e)
        {
            mudaCor(txtCep);
            if (!bNovo)
            {
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                bAlte = true;
                btnDel.Text = "&Cancelar";
            }
        }

        private void txtCep_Leave(object sender, EventArgs e)
        {
            if (atleta.ValidaCEP(txtCep.Text))
            {
                try
                {
                    var webService = new CadastrarAtletas.WSCorreios.AtendeClienteClient();
                    var resposta = webService.consultaCEP(txtCep.Text);

                    txtLogradouro.Text = resposta.end;
                    txtBairro.Text = resposta.bairro;
                    txtMunicipio.Text = resposta.cidade;
                    cbUF.Text = resposta.uf;
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message, "Erro", MessageBoxButtons.OK, MessageBoxIcon.Error);

                }
            }
        }

        private void txtComplemento_KeyPress(object sender, KeyPressEventArgs e)
        {
            mudaCor(txtComplemento);
            btnSalva.Enabled = true;
            if (!bNovo)
                lblStatus.Text = "Alteração " + sTitulo;
        }

        private void txtComplemento_KeyUp(object sender, KeyEventArgs e)
        {
            mudaCor(txtComplemento);
            if (!bNovo)
            {
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                bAlte = true;
                btnDel.Text = "&Cancelar";
            }
        }

        private void txtTag_KeyUp(object sender, KeyEventArgs e)
        {
            mudaCor(txtTag);
            if (!bNovo)
            {
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                bAlte = true;
                btnDel.Text = "&Cancelar";
            }
        }

        private void txtTag_TextChanged_1(object sender, EventArgs e)
        {
            btnSalvarTag.Enabled = true;
        }

        private void btnSalvarTag_Click(object sender, EventArgs e)
        {
            if (txtTag.Text.Trim() != "")
            {
                sParam = "'" + txtTag.Text + "','" + lblId.Text + "','" + txtCpf.Text.Replace(",", "").Replace("-", "") + "'";

                atleta.CadastrarTags(bNovo, txtTag.Text, bAlte, bdsDados, lblId.Text, sParam);

                dtgDados.Enabled = true;
                btnDel.Text = "&Excluir";
                btnDel.Enabled = true;
                btnNovo.Enabled = true;
                cmfw.Resetcor(gpTags.Controls);
                lblStatus.Text = sTitulo;
                bNovo = false;
                btnSalva.Enabled = false;
                gpTags.Enabled = false;
                txtTag.Text = "";
                dtgDados.Refresh();
            }
            else
            {
                Clmsg.frmA.sMsg = "Campo Tag não pode ser nulo";
            }
        }

        private void btnEditarTag_Click_1(object sender, EventArgs e)
        {

            Clmsg.frmP.sMsg = "Confirmar Alteraçao da TAG?";
            if (Clmsg.frmP.bConf)
            {
                Thread thread = new Thread(() => { Application.Run(new FrmEditarTag(lblId.Text, bdsDados)); });
                thread.Priority = ThreadPriority.Normal;
                thread.ApartmentState = ApartmentState.STA;
                thread.Start();
            }
            else
            {
                dtgDados.Enabled = true;
                return;
            }
        }

        private void guna2HtmlLabel2_Click(object sender, EventArgs e)
        {

        }

        private void cbUF_SelectedIndexChanged(object sender, EventArgs e)
        {
            //mudaCor(cbUF);
            //if (!bNovo)
            //{
            //    btnSalva.Enabled = true;
            //    dtgDados.Enabled = false;
            //    btnNovo.Enabled = false;
            //    bAlte = true;
            //    btnDel.Text = "&Cancelar";
            //}
        }

        private void cbSexo_SelectedIndexChanged(object sender, EventArgs e)
        {
            //mudaCor(cbSexo);
            //if (!bNovo)
            //{
            //    btnSalva.Enabled = true;
            //    dtgDados.Enabled = false;
            //    btnNovo.Enabled = false;
            //    bAlte = true;
            //    btnDel.Text = "&Cancelar";
            //}
        }

        private void cbEstadoCivil_SelectedIndexChanged(object sender, EventArgs e)
        {
            //mudaCor(cbEstadoCivil);
            //if (!bNovo)
            //{
            //    btnSalva.Enabled = true;
            //    dtgDados.Enabled = false;
            //    btnNovo.Enabled = false;
            //    bAlte = true;
            //    btnDel.Text = "&Cancelar";
            //}
        }

        private void cbUF_SelectedIndexChanged_1(object sender, EventArgs e)
        {

        }

        private void cbUF_Click_1(object sender, EventArgs e)
        {

        }

        private void cbUF_DropDown(object sender, EventArgs e)
        {
            mudaCor(cbUF);
            if (!bNovo)
            {
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                bAlte = true;
                btnDel.Text = "&Cancelar";
            }
        }

        private void cbSexo_DropDown(object sender, EventArgs e)
        {
            mudaCor(cbSexo);
            if (!bNovo)
            {
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                bAlte = true;
                btnDel.Text = "&Cancelar";
            }
        }

        private void cbEstadoCivil_DropDown(object sender, EventArgs e)
        {
            mudaCor(cbEstadoCivil);
            if (!bNovo)
            {
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                bAlte = true;
                btnDel.Text = "&Cancelar";
            }
        }

        private void cbCategoria_DropDown(object sender, EventArgs e)
        {
            mudaCor(cbCategoria);
            if (!bNovo)
            {
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                bAlte = true;
                btnDel.Text = "&Cancelar";
            }
        }
    }
}