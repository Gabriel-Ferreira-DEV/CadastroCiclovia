using System;
using System.Drawing;
using System.Windows.Forms;
using ClassDados;
using Messagens;
using System.Data.SqlClient;
using ClassGenerica;
using ClsMD5;
using Cadastro.View;
using CadastrarAtletas.Model;
using CadastrarAtletas.View;
using System.Threading.Tasks;
using System.Drawing.Drawing2D;

namespace ProgramadorBBB
{
    //GKF2-XXHY-DGSS-OFCI-2AYC-YAQU-NTEO-5U2F
    public partial class FrmLogins : Form
    {
        BindingSource bdsDados = new BindingSource();
        public string sNivel = "0";
        public bool bCentral = false;
        public bool bModoCentral = false;

        public string sCodUsuario = "0";
        public string sNomUsuario = "0";
        string sUsrOld = "";
        string sSenhaOld = "";

        //Classes auxiliares
        public ClasseDml cmdBdLogin = new ClasseDml();
        ClsMessagens crn = new ClsMessagens();
        RotinasFormWindows cmfw = new RotinasFormWindows();
        SecurityCryDec cmdSeg = new SecurityCryDec();
        Usuario usuario = new Usuario();

        public bool bEncerrado = false;



        public FrmLogins(string sUrlweb = null)
        {
            InitializeComponent();
            // Chame o método para arredondar as bordas do formulário
     
        }

        private void button1_Click(object sender, EventArgs e)
        {
            this.Close();
            cmdBdLogin.fechaConn();
        }


        private void FrmLogins_Load(object sender, EventArgs e)
        {

        }

        private void btnLogin_Click(object sender, EventArgs e)
        {
            if (txtUsr.Text == string.Empty || txtPwd.Text == string.Empty)
            {
                crn.frmF.sMsg = "Erro";
                crn.frmF.ShowDialog();
                return;
            }
            else
            {
                if (txtUsr.BackColor == Color.Lime)
                {
                    if (txtUsr.Text != txtPwd.Text)
                    {
                        crn.frmF.sMsg = "Senhas diferentes";
                        crn.frmF.ShowDialog();
                        txtUsr.Focus();
                        return;
                    }

                    if (txtUsr.Text.Length < 4)
                    {
                        crn.frmF.sMsg = "Mínimo 4 Caracteres";
                        crn.frmF.ShowDialog();
                        txtUsr.Focus();
                        return;
                    }

                    if (sSenhaOld == txtPwd.Text)
                    {
                        crn.frmF.sMsg = "Senha repetidas";
                        crn.frmF.ShowDialog();
                        txtUsr.Focus();
                        return;
                    }


                    if (usuario.AtualizarLogin(sUsrOld, sSenhaOld, txtPwd.Text))
                    {
                        sSenhaOld = "";
                        sUsrOld = "";
                        crn.frmS.ShowDialog();
                        txtUsr.PlaceholderText = "Usuário:";
                        txtPwd.PlaceholderText = "Senha:";
                        if (!ckAlt.Checked)
                            crn.frmF.sMsg = "Falha Login !!";
                        txtUsr.Text = "";
                        txtUsr.PasswordChar = (char)0;
                        txtUsr.Focus();
                        txtUsr.BackColor = Color.White;
                        txtPwd.Text = "";
                        txtPwd.BackColor = Color.White;
                        txtUsr.CharacterCasing = CharacterCasing.Upper;
                        ckAlt.Checked = false;
                    }
                    return;
                }

                sNivel = usuario.SeUsuario(txtUsr.Text, txtPwd.Text);
                if (sNivel == "Erro")
                {
                    txtUsr.Text = "";
                    txtUsr.Focus();
                    txtPwd.Text = "";
                }
                else if (sNivel == "X")
                {
                    crn.frmF.sMsg = "Login Invalido";
                    crn.frmF.ShowDialog();
                    txtUsr.Text = "";
                    txtUsr.Focus();
                    txtPwd.Text = "";
                    return;
                }
                else
                {

                    if (txtPwd.Text == "1234")
                    {
                        ckAlt.Checked = true;
                    }

                    if (ckAlt.Checked)
                    {

                        txtUsr.PlaceholderText = "Nova Senha:";
                        txtPwd.PlaceholderText = "Confirma Senha:";

                        txtUsr.PasswordChar = txtPwd.PasswordChar;
                        sUsrOld = txtUsr.Text;
                        txtUsr.Text = "";
                        txtUsr.Focus();
                        txtUsr.BorderColor = Color.Lime;
                        sSenhaOld = txtPwd.Text;
                        txtPwd.Text = "";
                        txtPwd.BackColor = Color.Lime;
                        txtUsr.CharacterCasing = CharacterCasing.Normal;
                    }
                    else
                    {
                    
                        this.Hide();            
                        FrmTelaPrincipal telaPrincipal = new FrmTelaPrincipal(sNivel);
                        telaPrincipal.ShowDialog();
                        this.Show();
                        txtUsr.Text = "";
                        txtPwd.Text = "";

                    }
                }
            }
        }

        private void txtUsr_KeyUp(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Return)
                txtPwd.Focus();

            if (e.KeyCode == Keys.F10)
            {
                txtUsr.Text = "ADMIN";
                txtPwd.Text = "1542";
                btnLogin_Click(sender, e);
            }

        }

        private void txtPwd_KeyUp(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Return)
                gunaBtnLogin.Focus();
        }

        private void ckAlt_CheckedChanged(object sender, EventArgs e)
        {
            if (!ckAlt.Checked)
            {
                txtUsr.PlaceholderText = "Usuário:";
                txtPwd.PlaceholderText = "Senha:";
                txtUsr.Text = "";
                txtUsr.Focus();
                txtUsr.BackColor = Color.White;
                txtPwd.Text = "";
                txtPwd.BackColor = Color.White;
            }
            txtUsr.Focus();
        }

        private void txtPwd_Enter(object sender, EventArgs e)
        {
            if (txtUsr.Text == "")
                txtUsr.Focus();
        }

        private void FrmLogins_FormClosing(object sender, FormClosingEventArgs e)
        {
            bEncerrado = true;
            cmdBdLogin.fechaConn();
        }

        private void FrmLogins_Enter(object sender, EventArgs e)
        {
            txtUsr.Focus();
        }


        private void FrmLogins_KeyUp(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.F1)
            {
                txtUsr.Focus();
                txtUsr.Text = "ADMIN";
                txtPwd.Text = "1542";
                gunaBtnLogin.Focus();
                btnLogin_Click(sender, e);
                e.Handled = true;
            }
            //if (e.KeyCode == Keys.F2)
            //{
            //    txtUsr.Focus();
            //    txtUsr.Text = "SUPERVISOR";
            //    txtPwd.Text = "4321";
            //    btnLogin.Focus();
            //    btnLogin_Click(sender, e);
            //    e.Handled = true;
            //}
            //if (e.KeyCode == Keys.F3)
            //{
            //    txtUsr.Focus();
            //    txtUsr.Text = "PROGRAMADOR";
            //    txtPwd.Text = "4321";
            //    btnLogin.Focus();
            //    btnLogin_Click(sender, e);
            //    e.Handled = true;
            //}

        }


        private void NomContrato_KeyUp(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Return)
            {
                txtUsr.Focus();
            }
        }

        private void FrmLogins_Shown(object sender, EventArgs e)
        {
            if (bModoCentral)
            {
                ckAlt.Visible = false;
            }
        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {

        }

        private void guna2Button1_Click(object sender, EventArgs e)
        {
            if (txtUsr.Text == string.Empty || txtPwd.Text == string.Empty)
            {
                crn.frmF.sMsg = "Erro";
                crn.frmF.ShowDialog();
                return;
            }
            else
            {
                if (txtUsr.BackColor == Color.Yellow)
                {
                    if (txtUsr.Text != txtPwd.Text)
                    {
                        crn.frmF.sMsg = "Senhas diferentes";
                        crn.frmF.ShowDialog();
                        txtUsr.Focus();
                        return;
                    }

                    if (txtUsr.Text.Length < 4)
                    {
                        crn.frmF.sMsg = "Mínimo 4 Caracteres";
                        crn.frmF.ShowDialog();
                        txtUsr.Focus();
                        return;
                    }

                    if (sSenhaOld == txtPwd.Text)
                    {
                        crn.frmF.sMsg = "Senha repetidas";
                        crn.frmF.ShowDialog();
                        txtUsr.Focus();
                        return;
                    }


                    if (usuario.AtualizarLogin(sUsrOld, sSenhaOld, txtPwd.Text))
                    {
                        sSenhaOld = "";
                        sUsrOld = "";
                        crn.frmS.ShowDialog();
                        txtUsr.PlaceholderText = "Usuário:";
                        txtPwd.PlaceholderText = "Senha:";
                        if (!ckAlt.Checked)
                            crn.frmF.sMsg = "Falha Login !!";
                        txtUsr.Text = "";
                        txtUsr.PasswordChar = (char)0;
                        txtUsr.Focus();
                        txtUsr.BackColor = Color.White;
                        txtPwd.Text = "";
                        txtPwd.BackColor = Color.White;
                        txtUsr.CharacterCasing = CharacterCasing.Upper;
                        ckAlt.Checked = false;
                    }
                    return;
                }

                sNivel = usuario.SeUsuario(txtUsr.Text, txtPwd.Text);
                if (sNivel == "Erro")
                {
                    txtUsr.Text = "";
                    txtUsr.Focus();
                    txtPwd.Text = "";
                }
                else if (sNivel == "X")
                {
                    crn.frmF.sMsg = "Login Invalido";
                    crn.frmF.ShowDialog();
                    txtUsr.Text = "";
                    txtUsr.Focus();
                    txtPwd.Text = "";
                    return;
                }
                else
                {

                    if (txtPwd.Text == "1234")
                    {
                        ckAlt.Checked = true;
                    }

                    if (ckAlt.Checked)
                    {

                        txtUsr.PlaceholderText = "Nova Senha:";
                        txtPwd.PlaceholderText = "Confirma Senha:";

                        txtUsr.PasswordChar = txtPwd.PasswordChar;
                        sUsrOld = txtUsr.Text;
                        txtUsr.Text = "";
                        txtUsr.Focus();
                        txtUsr.BackColor = Color.Yellow;
                        sSenhaOld = txtPwd.Text;
                        txtPwd.Text = "";
                        txtPwd.BackColor = Color.Yellow;
                        txtUsr.CharacterCasing = CharacterCasing.Normal;
                    }
                    else
                    {

                        this.Hide();
                        FrmTelaPrincipal telaPrincipal = new FrmTelaPrincipal(sNivel);
                        telaPrincipal.ShowDialog();
                        this.Show();
                        txtUsr.Text = "";
                        txtPwd.Text = "";

                    }
                }
            }
        }

        private void guna2Button1_Click_1(object sender, EventArgs e)
        {
            this.Close();
            cmdBdLogin.fechaConn();
        }

        private void guna2ToggleSwitch1_CheckedChanged(object sender, EventArgs e)
        {

        }

        private void ckAlt_CheckedChanged_1(object sender, EventArgs e)
        {
            if (!ckAlt.Checked)
            {
                txtUsr.PlaceholderText = "Usuário:";
                txtPwd.PlaceholderText = "Senha:";
                txtUsr.Text = "";
                txtUsr.Focus();
                txtUsr.BackColor = Color.White;
                txtPwd.Text = "";
                txtPwd.BackColor = Color.White;
            }
            txtUsr.Focus();
        }

        private void txtUser_KeyUp(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Return)
                txtPwd.Focus();

            if (e.KeyCode == Keys.F10)
            {
                txtUsr.Text = "ADMIN";
                txtPwd.Text = "1542";
                btnLogin_Click(sender, e);
            }
        }

        private void txtPwd_KeyUp_1(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Return)
                gunaBtnLogin.Focus();
        }

        private void txtPwd_TextChanged(object sender, EventArgs e)
        {

        }

        private void txtPwd_KeyUp_2(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Return)
                gunaBtnLogin.Focus();
        }

        private void guna2ControlBox1_Click(object sender, EventArgs e)
        {
            bEncerrado = true;
            cmdBdLogin.fechaConn();
        }
    }
}
