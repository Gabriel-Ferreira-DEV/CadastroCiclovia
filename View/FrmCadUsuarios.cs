using System;
using System.Drawing;
using System.Windows.Forms;
using System.Data.SqlClient;
using ClassDados;
using ClassGenerica;
using ClsMD5;
using CadastrarAtletas.Model;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Guna.UI2.WinForms;

namespace ProgramadorBBB
{
    public partial class FrmCadUsuarios : Form
    {
        public bool bAdmin = false;
        public string sTitulo = "Usuarios Cadastrados";
        bool check = false; //verificar se o checkbox esta selecionado
        Atleta atleta = new Atleta();

        string sPes = "NomCliente";
        SecurityCryDec seg = new SecurityCryDec();

        Messagens.ClsMessagens Clmsg = new Messagens.ClsMessagens();
        public bool bStart = false;
        public string sCodUsr = "1";
        Color clr1 = Color.FromArgb(88, 128, 180);
        Usuario usuario = new Usuario();

        //classes
        public ClassDados.ClasseDml cmdBd = new ClasseDml();
        RotinasFormWindows cmfw = new RotinasFormWindows();
        ClassGenerica.RotinaGenerica rGen = new RotinaGenerica();

        // objeto conection de banco 
        public SqlConnection Connection;

        //variaveis locais
        bool bNovo = false;
        bool bAlte = false;
        bool basico = false;
        bool administrador = false;

        // Bindsource de dados
        BindingSource bdsDados = new BindingSource();

        public bool bEncerrado = false;
        public FrmCadUsuarios()
        {
            InitializeComponent();
        }

        private void FrmComerciais_Load(object sender, EventArgs e)
        {
            try
            {
                lblStatus.Text = sTitulo;

                atleta.updatBds(ref bdsDados, "PPSelUsuarios", "");

                cmfw.CriaGrid(ref dtgDados, "Cod", "CodUsuario", 40, DataGridViewContentAlignment.MiddleCenter);
                cmfw.CriaGrid(ref dtgDados, "Usuario", "NomUsuario", 363);
                cmfw.CriaGrid(ref dtgDados, "Login", "TxtLogin", 363);
                cmfw.CriaGrid(ref dtgDados, "GP", "DomGrupo", 55, DataGridViewContentAlignment.MiddleCenter);
                cmfw.CriaGrid(ref dtgDados, "Ativo", "DomAtivo", 55, DataGridViewContentAlignment.MiddleCenter);

                cmfw.setLista(ref lblId, "Text", ref bdsDados, "CodUsuario");
                cmfw.setLista(ref DomGrupo, "Text", ref bdsDados, "DomGrupo");
                cmfw.setListaControls(gpDado.Controls, ref bdsDados);

                dtgDados.AutoGenerateColumns = false;
                dtgDados.DataSource = bdsDados;
                btnDel.Enabled = (bdsDados.Count > 0);
                gpDado.Enabled = btnDel.Enabled;

            }
            catch (Exception ex)
            {
                MessageBox.Show($"Ocorreu um erro: {ex.Message}", "Erro", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void btnPrimeiro_Click(object sender, EventArgs e)
        {
            bdsDados.MoveFirst();
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
        }

        private void btnNovo_Click(object sender, EventArgs e)
        {
            bdsDados.AddNew();
            bNovo = true;
            gpDado.Enabled = true;
            NomUsuario.Focus();
            lblStatus.Text = "Novo Cadastro";
            cmfw.Resetcor(gpDado.Controls);
            cmfw.Resetcor(guna2GroupBox2.Controls);
            administrador = false;
            basico = false;
        }

        private void btnDel_Click(object sender, EventArgs e)
        {
            btnSalva.Enabled = true;
            cmfw.Resetcor(gpDado.Controls);
            cmfw.Resetcor(guna2GroupBox2.Controls);

            usuario.DeletarUsuario(lblId.Text, bNovo, bAlte, btnDel, btnSalva, btnNovo, bdsDados, dtgDados);

            if (administrador)
            {
                ckAdministrador.Checked = true;
                ckAdministrador.Enabled = true;
            }
            else if (basico)
            {
                ckBasico.Checked = true;
                ckBasico.Enabled = true;
            }

            bAlte = false;
            bNovo = false;
            btnSalva.Enabled = false;
            dtgDados.Refresh();
            dtgDados.Enabled = true;
            btnDel.Text = "&Excluir";
            btnDel.Enabled = true;
            btnNovo.Enabled = true;
            bNovo = false;
        }

        private bool IsNumeric(int Val)
        {
            return ((Val >= 96 && Val <= 105) || (Val >= 48 && Val <= 57) || (Val == 8) || (Val == 46));
        }


        static int BinaryToDec(string input)
        {
            char[] array = input.ToCharArray();
            // Reverse since 16-8-4-2-1 not 1-2-4-8-16. 
            Array.Reverse(array);
            /*
             * [0] = 1
             * [1] = 2
             * [2] = 4
             * etc
             */
            int sum = 0;

            for (int i = 0; i < array.Length; i++)
            {
                if (array[i] == '1')
                {
                    // Method uses raising 2 to the power of the index. 
                    if (i == 0)
                    {
                        sum += 1;
                    }
                    else
                    {
                        sum += (int)System.Math.Pow(2, i);
                    }
                }

            }

            return sum;
        }

        private void btnSalva_Click(object sender, EventArgs e)
        {
            if (ckBasico.Checked || ckAdministrador.Checked)
            {
                check = true;
            }

            usuario = new Usuario(NomUsuario.Text.Trim(), TxtLogin.Text.Trim(), DomAtivo.Text.Trim(), check);

            List<ValidationResult> listErros = new List<ValidationResult>();//lista para capturar erros e armazenar
            ValidationContext contect = new ValidationContext(usuario); //passa o obj que sera validado
            bool validator = Validator.TryValidateObject(usuario, contect, listErros, true); //valida todos os erros

            if (!validator)
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
                try
                {
                    string sParam = "";
                    if ((NomUsuario.Text != "") && (TxtLogin.Text != ""))
                    {
                        if (!bNovo)
                        {

                            Clmsg.frmP.sMsg = "Confirma Alteraçao???";
                            if (!Clmsg.frmP.bConf)
                            {
                                dtgDados.Enabled = true;
                                return;
                            }

                        }

                        string sFunc = "";

                        if (ckBasico.Checked)
                            sFunc += "1";
                        else
                            sFunc += "0";

                        if (ckAdministrador.Checked)
                            sFunc += "1";
                        else
                            sFunc += "0";


                        bool bRet = false;
                        if (bNovo)
                        {
                            sParam = "'" + NomUsuario.Text + "'";
                            sParam += ",'" + TxtLogin.Text.Replace(",", ".") + "'";
                            sParam += ",'" + seg.Encrypt("1234") + "'";
                            sParam += ",'" + DomAtivo.Text + "'";
                            sParam += ",'" + BinaryToDec("0000" + sFunc).ToString() + "'";
                            bRet = usuario.CadastraUsuario(sParam);

                        }
                        else
                        {
                            sParam = "'" + NomUsuario.Text + "'";
                            sParam += ",'" + TxtLogin.Text.Replace(",", ".") + "'";
                            sParam += ",'" + DomAtivo.Text + "'";
                            sParam += ",'" + BinaryToDec("0000" + sFunc).ToString() + "'";

                            string sParamUpd = @lblId.Text + "," + sParam;
                            bRet = usuario.AtualizarUsuario(sParamUpd);

                        }

                        if (bRet == true)
                        {
                            Clmsg.frmS.ShowDialog();
                            bNovo = false;
                            bAlte = false;
                            ckBasico.Enabled = true;
                            ckAdministrador.Enabled = true;
                            atleta.updatBds(ref bdsDados, "PPSelUsuarios", "");
                        }
                    }
                    else
                    {
                        return;
                    }


                    btnSalva.Enabled = false;
                    dtgDados.Refresh();
                    dtgDados.Enabled = true;
                    btnDel.Text = "&Excluir";
                    btnDel.Enabled = true;
                    btnNovo.Enabled = true;
                    cmfw.Resetcor(gpDado.Controls);
                    bNovo = false;
                }
                catch
                {
                    MessageBox.Show("Erro: \r\n" + cmdBd.SError, "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }

        }



        void validaText2(object sender, KeyEventArgs e)
        {

        }

        private void FrmProgramas_FormClosing(object sender, FormClosingEventArgs e)
        {
            bEncerrado = true;
        }

        private void btnPrimeiro_MouseEnter(object sender, EventArgs e)
        {
            ((Button)(sender)).BackColor = Color.Red;
            ((Button)(sender)).Cursor = Cursors.Hand;
        }

        private void btnPrimeiro_MouseLeave(object sender, EventArgs e)
        {
            ((Button)(sender)).BackColor = Color.Transparent;//clr1;
            ((Button)(sender)).Cursor = Cursors.Default;
        }

        private void textBox1_KeyUp(object sender, KeyEventArgs e)
        {

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
        //        lblStatus.Text = "Alteração Comercial ...";
        //        btnDel.Text = "&Cancelar";
        //        btnDel.Enabled = true;
        //    }
        //}

        private void FrmComerciais_FormClosing(object sender, FormClosingEventArgs e)
        {
            bEncerrado = true;
        }

        void mudaCor(object sender)
        {
            if (!bNovo)
            {
                string sTipo = sender.GetType().ToString();
                if (sTipo.Contains("MaskedTextBox"))
                {
                    ((MaskedTextBox)sender).BackColor = Color.LightGreen;
                    bAlte = true;
                }
                else if (sTipo.Contains("TextBox"))
                {

                    ((TextBox)sender).BackColor = Color.LightGreen;
                    bAlte = true;
                }
                else if (sTipo.Contains("ComboBox"))
                {
                    ((ComboBox)sender).BackColor = Color.LightGreen;
                    bAlte = true;
                }
            }
        }

        private void NomCliente_KeyPress(object sender, KeyPressEventArgs e)
        {
            mudaCor(NomUsuario);
            btnSalva.Enabled = true;
            if (!bNovo)
            {
                lblStatus.Text = "Alteração " + sTitulo;
                bAlte = true;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
            }

        }

        private void NomCliente_KeyUp(object sender, KeyEventArgs e)
        {
            mudaCor(NomUsuario);
            btnSalva.Enabled = true;
            if (!bNovo)
            {
                lblStatus.Text = "Alteração " + sTitulo;
                bAlte = true;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
            }

        }

        private void NomCliente_Enter(object sender, EventArgs e)
        {
            string sTipo = sender.GetType().ToString();
            if (sTipo.Contains("MaskedTextBox"))
                sPes = ((MaskedTextBox)sender).Name;
            else
            {
                if (sTipo.Contains("TextBox"))
                    sPes = ((TextBox)sender).Name;
            }
        }

        private void DomGrupo_TextChanged(object sender, EventArgs e)
        {
            try
            {
                string sFunc = DecimalToBinary(DomGrupo.Text);
                bool bGP = sFunc.Substring(sFunc.Length - 1, 1) == "1";
                //    ckAlerta.Checked = sFunc.Substring(sFunc.Length - 2, 1) == "1";
                ckAdministrador.Checked = sFunc.Substring(sFunc.Length - 1, 1) == "1";
                if (ckAdministrador.Checked)
                {
                    basico = false;
                    administrador = true;

                }
                ckBasico.Checked = sFunc.Substring(sFunc.Length - 2, 1) == "1";
                if (ckBasico.Checked)
                {
                    administrador = false;
                    basico = true;

                }
            }
            catch (Exception ex)
            {
                string erro = ex.Message;

            }
        }

        public static string DecimalToBinary(string data)
        {
            string result = string.Empty;
            int rem = 0;
            try
            {
                {
                    int num = int.Parse(data);
                    while (num > 0)
                    {
                        rem = num % 2;
                        num = num / 2;
                        result = rem.ToString() + result;
                    }
                }
            }
            catch (Exception ex)
            {
                string erro = ex.Message;
            }

            result = "00000000" + result;
            result = result.Substring(result.Length - 8);

            return result;
        }


        private void ckBasico_CheckStateChanged(object sender, EventArgs e)
        {

        }

        private void ckAdministrador_CheckStateChanged(object sender, EventArgs e)
        {

        }

        private void NomUsuario_TextChanged(object sender, EventArgs e)
        {

        }

        private void TxtLogin_KeyPress(object sender, KeyPressEventArgs e)
        {
            mudaCor(TxtLogin);
            btnSalva.Enabled = true;
            if (!bNovo)
            {
                lblStatus.Text = "Alteração " + sTitulo;
                bAlte = true;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
            }
        }

        private void TxtLogin_KeyUp(object sender, KeyEventArgs e)
        {
            mudaCor(TxtLogin);
            btnSalva.Enabled = true;
            if (!bNovo)
            {
                lblStatus.Text = "Alteração " + sTitulo;
                bAlte = true;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
            }
        }

        private void DomAtivo_KeyPress(object sender, KeyPressEventArgs e)
        {
            mudaCor(DomAtivo);
            btnSalva.Enabled = true;
            if (!bNovo)
            {
                lblStatus.Text = "Alteração " + sTitulo;
                bAlte = true;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
            }
        }

        private void DomAtivo_KeyUp(object sender, KeyEventArgs e)
        {
            mudaCor(DomAtivo);
            btnSalva.Enabled = true;
            if (!bNovo)
            {
                lblStatus.Text = "Alteração " + sTitulo;
                bAlte = true;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {

        }

        private void dtgDados_CellClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void anged(object sender, EventArgs e)
        {

        }

        private void ckBasico_Click(object sender, EventArgs e)
        {
            if (administrador)
            {

                btnSalva.Enabled = true;
                lblStatus.Text = "Alteração " + sTitulo;
                ckAdministrador.Checked = false;
                ckAdministrador.Enabled = false;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
                bAlte = true;

            }
            else if (bNovo)
            {
                ckAdministrador.Checked = false;
                ckAdministrador.Enabled = false;
                if (!ckBasico.Checked)
                {
                    ckAdministrador.Enabled = true;
                }
            }
        }

        private void ckAdministrador_Click(object sender, EventArgs e)
        {
            if (basico)
            {
                btnSalva.Enabled = true;
                lblStatus.Text = "Alteração " + sTitulo;
                ckBasico.Checked = false;
                ckBasico.Enabled = false;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
                bAlte = true;

            }
            else if (bNovo)
            {
                ckBasico.Checked = false;
                ckBasico.Enabled = false;
                if (!ckAdministrador.Checked)
                {
                    ckBasico.Enabled = true;
                }
            }
        }

        private void groupBox3_Enter(object sender, EventArgs e)
        {

        }

        private void ckBasico_CheckedChanged(object sender, EventArgs e)
        {

        }

        private void btnSalva_Click_1(object sender, EventArgs e)
        {
            if (ckBasico.Checked || ckAdministrador.Checked)
            {
                check = true;
            }

            usuario = new Usuario(NomUsuario.Text.Trim(), TxtLogin.Text.Trim(), DomAtivo.Text.Trim(), check);

            List<ValidationResult> listErros = new List<ValidationResult>();//lista para capturar erros e armazenar
            ValidationContext contect = new ValidationContext(usuario); //passa o obj que sera validado
            bool validator = Validator.TryValidateObject(usuario, contect, listErros, true); //valida todos os erros

            if (!validator)
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
                try
                {
                    string sParam = "";
                    if ((NomUsuario.Text != "") && (TxtLogin.Text != ""))
                    {
                        if (!bNovo)
                        {

                            Clmsg.frmP.sMsg = "Confirma Alteraçao???";
                            if (!Clmsg.frmP.bConf)
                            {
                                dtgDados.Enabled = true;
                                return;
                            }

                        }

                        string sFunc = "";

                        if (ckBasico.Checked)
                            sFunc += "1";
                        else
                            sFunc += "0";

                        if (ckAdministrador.Checked)
                            sFunc += "1";
                        else
                            sFunc += "0";


                        bool bRet = false;
                        if (bNovo)
                        {
                            sParam = "'" + NomUsuario.Text + "'";
                            sParam += ",'" + TxtLogin.Text.Replace(",", ".") + "'";
                            sParam += ",'" + seg.Encrypt("1234") + "'";
                            sParam += ",'" + DomAtivo.Text + "'";
                            sParam += ",'" + BinaryToDec("0000" + sFunc).ToString() + "'";
                            bRet = usuario.CadastraUsuario(sParam);

                        }
                        else
                        {
                            sParam = "'" + NomUsuario.Text + "'";
                            sParam += ",'" + TxtLogin.Text.Replace(",", ".") + "'";
                            sParam += ",'" + DomAtivo.Text + "'";
                            sParam += ",'" + BinaryToDec("0000" + sFunc).ToString() + "'";

                            string sParamUpd = @lblId.Text + "," + sParam;
                            bRet = usuario.AtualizarUsuario(sParamUpd);

                        }

                        if (bRet == true)
                        {
                            Clmsg.frmS.ShowDialog();
                            bNovo = false;
                            bAlte = false;
                            ckBasico.Enabled = true;
                            ckAdministrador.Enabled = true;
                            atleta.updatBds(ref bdsDados, "PPSelUsuarios", "");
                        }
                    }
                    else
                    {
                        return;
                    }


                    btnSalva.Enabled = false;
                    dtgDados.Refresh();
                    dtgDados.Enabled = true;
                    btnDel.Text = "&Excluir";
                    btnDel.Enabled = true;
                    btnNovo.Enabled = true;
                    cmfw.Resetcor(gpDado.Controls);
                    bNovo = false;
                }
                catch
                {
                    MessageBox.Show("Erro: \r\n" + cmdBd.SError, "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }

        }

        private void btnDel_Click_1(object sender, EventArgs e)
        {
            btnSalva.Enabled = true;
            cmfw.Resetcor(gpDado.Controls);
            cmfw.Resetcor(guna2GroupBox2.Controls);

            usuario.DeletarUsuario(lblId.Text, bNovo, bAlte, btnDel, btnSalva, btnNovo, bdsDados, dtgDados);

            if (administrador)
            {
                ckAdministrador.Checked = true;
                ckAdministrador.Enabled = true;
            }
            else if (basico)
            {
                ckBasico.Checked = true;
                ckBasico.Enabled = true;
            }

            bAlte = false;
            bNovo = false;
            btnSalva.Enabled = false;
            dtgDados.Refresh();
            dtgDados.Enabled = true;
            btnDel.Text = "&Excluir";
            btnDel.Enabled = true;
            btnNovo.Enabled = true;
            bNovo = false;
        }

        private void btnNovo_Click_1(object sender, EventArgs e)
        {

        }

        private void btnUltimo_Click_1(object sender, EventArgs e)
        {
            bdsDados.MoveLast();
        }

        private void btnProximo_Click(object sender, EventArgs e)
        {
            bdsDados.MoveNext();
        }

        private void btnAnterior_Click_1(object sender, EventArgs e)
        {
            bdsDados.MovePrevious();
        }

        private void btnPrimeiro_Click_1(object sender, EventArgs e)
        {
            bdsDados.MoveFirst();
        }

        private void ckBasico_Click_1(object sender, EventArgs e)
        {
            if (administrador)
            {

                btnSalva.Enabled = true;
                lblStatus.Text = "Alteração " + sTitulo;
                ckAdministrador.Checked = false;
                ckAdministrador.Enabled = false;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
                bAlte = true;

            }
            else if (bNovo)
            {
                ckAdministrador.Checked = false;
                ckAdministrador.Enabled = false;
                if (!ckBasico.Checked)
                {
                    ckAdministrador.Enabled = true;
                }
            }
        }

        private void ckAdministrador_Click_1(object sender, EventArgs e)
        {

        }

        private void ckAdministrador_Click_2(object sender, EventArgs e)
        {
            if (basico)
            {


                btnSalva.Enabled = true;
                lblStatus.Text = "Alteração " + sTitulo;
                ckBasico.Checked = false;
                ckBasico.Enabled = false;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
                bAlte = true;

            }
            else if (bNovo)
            {
                ckBasico.Checked = false;
                ckBasico.Enabled = false;
                if (!ckAdministrador.Checked)
                {
                    ckBasico.Enabled = true;
                }
            }

        }

        private void guna2Button1_Click(object sender, EventArgs e)
        {
            btnSalva.Enabled = true;
            cmfw.Resetcor(gpDado.Controls);
            cmfw.Resetcor(guna2GroupBox2.Controls);

            usuario.DeletarUsuario(lblId.Text, bNovo, bAlte, btnDel, btnSalva, btnNovo, bdsDados, dtgDados);

            if (administrador)
            {
                ckAdministrador.Checked = true;
                ckAdministrador.Enabled = true;
            }
            else if (basico)
            {
                ckBasico.Checked = true;
                ckBasico.Enabled = true;
            }

            bAlte = false;
            bNovo = false;
            btnSalva.Enabled = false;
            dtgDados.Refresh();
            dtgDados.Enabled = true;
            btnDel.Text = "&Excluir";
            btnDel.Enabled = true;
            btnNovo.Enabled = true;
            bNovo = false;
        }

        private void btnSalva_Click_2(object sender, EventArgs e)
        {
            if (ckBasico.Checked || ckAdministrador.Checked)
            {
                check = true;
            }

            usuario = new Usuario(NomUsuario.Text.Trim(), TxtLogin.Text.Trim(), DomAtivo.Text.Trim(), check);

            List<ValidationResult> listErros = new List<ValidationResult>();//lista para capturar erros e armazenar
            ValidationContext contect = new ValidationContext(usuario); //passa o obj que sera validado
            bool validator = Validator.TryValidateObject(usuario, contect, listErros, true); //valida todos os erros

            if (!validator)
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
                try
                {
                    string sParam = "";
                    if ((NomUsuario.Text != "") && (TxtLogin.Text != ""))
                    {
                        if (!bNovo)
                        {

                            Clmsg.frmP.sMsg = "Confirma Alteraçao???";
                            if (!Clmsg.frmP.bConf)
                            {
                                dtgDados.Enabled = true;
                                return;
                            }

                        }

                        string sFunc = "";

                        if (ckBasico.Checked)
                            sFunc += "1";
                        else
                            sFunc += "0";

                        if (ckAdministrador.Checked)
                            sFunc += "1";
                        else
                            sFunc += "0";


                        bool bRet = false;
                        if (bNovo)
                        {
                            sParam = "'" + NomUsuario.Text + "'";
                            sParam += ",'" + TxtLogin.Text.Replace(",", ".") + "'";
                            sParam += ",'" + seg.Encrypt("1234") + "'";
                            sParam += ",'" + DomAtivo.Text + "'";
                            sParam += ",'" + BinaryToDec("0000" + sFunc).ToString() + "'";
                            bRet = usuario.CadastraUsuario(sParam);


                        }
                        else
                        {
                            sParam = "'" + NomUsuario.Text + "'";
                            sParam += ",'" + TxtLogin.Text.Replace(",", ".") + "'";
                            sParam += ",'" + DomAtivo.Text + "'";
                            sParam += ",'" + BinaryToDec("0000" + sFunc).ToString() + "'";

                            string sParamUpd = @lblId.Text + "," + sParam;
                            bRet = usuario.AtualizarUsuario(sParamUpd);

                        }

                        if (bRet == true)
                        {
                            Clmsg.frmS.ShowDialog();
                            bNovo = false;
                            bAlte = false;
                            ckBasico.Enabled = true;
                            ckAdministrador.Enabled = true;
                            atleta.updatBds(ref bdsDados, "PPSelUsuarios", "");
                        }
                    }
                    else
                    {
                        return;
                    }


                    btnSalva.Enabled = false;
                    dtgDados.Refresh();
                    dtgDados.Enabled = true;
                    btnDel.Text = "&Excluir";
                    btnDel.Enabled = true;
                    btnNovo.Enabled = true;
                    cmfw.Resetcor(gpDado.Controls);
                    bNovo = false;
                }
                catch
                {
                    MessageBox.Show("Erro: \r\n" + cmdBd.SError, "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private void btnNovo_Click_2(object sender, EventArgs e)
        {
            bdsDados.AddNew();
            bNovo = true;
            gpDado.Enabled = true;
            NomUsuario.Focus();
            lblStatus.Text = "Novo Cadastro";
            cmfw.Resetcor(gpDado.Controls);
            cmfw.Resetcor(guna2GroupBox2.Controls);
            administrador = false;
            basico = false;
        }

        private void ckBasico_Click_2(object sender, EventArgs e)
        { 
            if (administrador)
            {

                btnSalva.Enabled = true;
                lblStatus.Text = "Alteração " + sTitulo;
                ckAdministrador.Checked = false;
                ckAdministrador.Enabled = false;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
                bAlte = true;

            }
            else if(bNovo)
            {
                ckAdministrador.Checked = false;
                ckAdministrador.Enabled = false;
                if(!ckBasico.Checked)
                {
                    ckAdministrador.Enabled = true;
                }
            }
        }

        private void ckAdministrador_Click_3(object sender, EventArgs e)
        {
            if (basico)
            {
                btnSalva.Enabled = true;
                lblStatus.Text = "Alteração " + sTitulo;
                ckBasico.Checked = false;
                ckBasico.Enabled = false;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
                bAlte = true;

            }
            else if (bNovo)
            {
                ckBasico.Checked = false;
                ckBasico.Enabled = false;
                if (!ckAdministrador.Checked)
                {
                    ckBasico.Enabled = true;
                }
            }
        }

        private void btnUltimo_Click_2(object sender, EventArgs e)
        {
            bdsDados.MoveLast();
        }

        private void btnProximo_Click_1(object sender, EventArgs e)
        {
            bdsDados.MoveNext();
        }

        private void btnAnterior_Click_2(object sender, EventArgs e)
        {
            bdsDados.MovePrevious();
        }

        private void btnPrimeiro_Click_2(object sender, EventArgs e)
        {
            bdsDados.MoveFirst();
        }

        private void gbDado_Click(object sender, EventArgs e)
        {

        }

        private void NomUsuario_KeyPress(object sender, KeyPressEventArgs e)
        {
            mudaCor(NomUsuario);
            btnSalva.Enabled = true;
            if (!bNovo)
            {
                lblStatus.Text = "Alteração " + sTitulo;
                bAlte = true;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
            }
        }

        private void NomUsuario_KeyUp(object sender, KeyEventArgs e)
        {
            mudaCor(NomUsuario);
            btnSalva.Enabled = true;
            if (!bNovo)
            {
                lblStatus.Text = "Alteração " + sTitulo;
                bAlte = true;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
            }
        }

        private void TxtLogin_KeyPress_1(object sender, KeyPressEventArgs e)
        {
            mudaCor(TxtLogin);
            btnSalva.Enabled = true;
            if (!bNovo)
            {
                lblStatus.Text = "Alteração " + sTitulo;
                bAlte = true;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
            }
        }

        private void TxtLogin_KeyUp_1(object sender, KeyEventArgs e)
        {
            mudaCor(TxtLogin);
            btnSalva.Enabled = true;
            if (!bNovo)
            {
                lblStatus.Text = "Alteração " + sTitulo;
                bAlte = true;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
            }
        }

        private void DomAtivo_KeyPress_1(object sender, KeyPressEventArgs e)
        {
            mudaCor(DomAtivo);
            btnSalva.Enabled = true;
            if (!bNovo)
            {
                lblStatus.Text = "Alteração " + sTitulo;
                bAlte = true;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
            }
        }

        private void DomAtivo_KeyUp_1(object sender, KeyEventArgs e)
        {
            mudaCor(DomAtivo);
            btnSalva.Enabled = true;
            if (!bNovo)
            {
                lblStatus.Text = "Alteração " + sTitulo;
                bAlte = true;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
            }
        }

        private void ckAdministrador_CheckedChanged(object sender, EventArgs e)
        {
            if (basico)
            {
                btnSalva.Enabled = true;
                lblStatus.Text = "Alteração " + sTitulo;
                ckBasico.Checked = false;
                ckBasico.Enabled = false;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
                bAlte = true;

            }
            else if (bNovo)
            {
                ckBasico.Checked = false;
                ckBasico.Enabled = false;
                if (!ckAdministrador.Checked)
                {
                    ckBasico.Enabled = true;
                }
            }
        }

        private void ckBasico_CheckedChanged_1(object sender, EventArgs e)
        {
            if (administrador)
            {

                btnSalva.Enabled = true;
                lblStatus.Text = "Alteração " + sTitulo;
                ckAdministrador.Checked = false;
                ckAdministrador.Enabled = false;
                btnSalva.Enabled = true;
                dtgDados.Enabled = false;
                btnNovo.Enabled = false;
                btnDel.Text = "&Cancelar";
                bAlte = true;

            }
            else if (bNovo)
            {
                ckAdministrador.Checked = false;
                ckAdministrador.Enabled = false;
                if (!ckBasico.Checked)
                {
                    ckAdministrador.Enabled = true;
                }
            }
        }
    }
    
}
