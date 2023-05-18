using ClassDados;
using ClsMD5;
using Guna.UI2.WinForms;
using System;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
using System.Data;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Windows.Forms;

namespace CadastrarAtletas.Model
{
    internal class Usuario
    {
        [Required(ErrorMessage = "Campo Usuario é obrigatorio...")]
        public string User { get; set; }

        [Required(ErrorMessage = "Campo Login é obrigatorio")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Campo DomAtivo é obrigatorio")]
        [RegularExpression("^[S|N]{1}$", ErrorMessage = "Apenas S ou N são permitidos")]
        public string DomAtivo { get; set; }

        [Range(typeof(bool), "true", "true", ErrorMessage = "Por favor, selecione o nivel do usuario")]
        public bool CheckBoxOpcaoUm { get; set; }

        private ClasseDml2 cmdBD = new ClasseDml2();
        private SecurityCryDec cmdSeg = new SecurityCryDec();
        private Messagens.ClsMessagens Clmsg = new Messagens.ClsMessagens();
        private string sRetorno = "";

        public Usuario()
        {
        }

        public Usuario(string user, string login, string domAtivo, bool check)
        {
            User = user;
            Login = login;
            DomAtivo = domAtivo;
            CheckBoxOpcaoUm = check;
        }

        public bool conectaBd()
        {
            try
            {
                string sServidorSql = ConfigurationManager.AppSettings["Servidor"].ToString();
                string sBancoSql = ConfigurationManager.AppSettings["Banco"].ToString();
                cmdBD.sqlConnectionString = "Data Source=" + sServidorSql + ";Initial Catalog=" + sBancoSql + ";Persist Security Info=True;Password=vox41; User ID=vox41; Connection Timeout=360";
                if (cmdBD.connection == null || cmdBD.connection.State != ConnectionState.Open)
                {
                    if (!cmdBD.abreConn())
                    {
                        throw new Exception(cmdBD.SError);
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Erro", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return false;
            }
            return true;
        }

        public bool AtualizarUsuario(string param)
        {
            if (conectaBd())
            {
                cmdBD.ExecmdProc("PPUpdUsuarios", param);
                if (cmdBD.SError != null)
                {
                    Clmsg.frmF.ShowDialog();
                    MessageBox.Show(cmdBD.SError, "Erro", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return false;
                }
                else
                {
                    return true;
                }
            }
            else { return false; }
        }

        public bool CadastraUsuario(string param)
        {
            if (conectaBd())
            {
                cmdBD.ExecmdProc("PPInsUsuarios", param);

                if (cmdBD.SError != null)
                {
                    Clmsg.frmF.ShowDialog();
                    MessageBox.Show(cmdBD.SError, "Erro", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return false;
                }
                else
                {
                    return true;
                }
            }
            else
            {
                return false;
            }
        }

        public string SeUsuario(string user, string pwd)
        {
            if (conectaBd())
            {
                sRetorno = cmdBD.Exevalue("PPSelLogin", "'" + user.Trim() + "','" + cmdSeg.Encrypt(pwd.Trim()) + "'");
                if ((cmdBD.SError != null))
                {
                    sRetorno = "Erro";
                    Clmsg.frmF.sMsg = "Falha Login !!";
                    Clmsg.frmF.ShowDialog();
                    if (cmdBD.SError != null)
                        MessageBox.Show(cmdBD.SError, "Login", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }

                return sRetorno;
            }
            else
            {
                return null;
            }
        }

        public string SeUsuarioCod(string user, string pwd, string nivel)
        {
            if (conectaBd())
            {
                sRetorno = cmdBD.Exevalue("PPSelCodLogin", "'" + user.Trim() + "','" + cmdSeg.Encrypt(pwd.Trim()) + "'");
                if (cmdBD.SError != null)
                {
                    Clmsg.frmF.sMsg = "Falha Login !!";
                    Clmsg.frmF.ShowDialog();
                    if (cmdBD.SError != null)
                        MessageBox.Show(cmdBD.SError, "Login", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return sRetorno = null;
                }
                return sRetorno;
             
            }
            else 
            { 
                return sRetorno = null; 
            }
        }

        public bool AtualizarLogin(string userOld, string pwdOld, string pwd)
        {
            if (conectaBd())
            {
                cmdBD.ExecmdProc("PPUpdLogin", "'" + userOld + "','" + cmdSeg.Encrypt(pwdOld) + "','" + cmdSeg.Encrypt(pwd) + "'");
                if (cmdBD.SError != null)
                {

                    Clmsg.frmF.sMsg = "Erro ao atualizar a senha";
                    Clmsg.frmF.ShowDialog();

                    MessageBox.Show(cmdBD.SError, "Login", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return false;
                }
                else
                {
                    return true;
                }
            }
            else
            {
                return false;
            }
        }

        public void DeletarUsuario(string id, bool bNovo, bool bAlte, Guna2Button btnDel, Guna2Button btnSalva, Guna2Button btnNovo, BindingSource bdsDados, DataGridView dtgDados)
        {
            if(conectaBd())
            {

                if (bAlte && !bNovo)
                {
                    bdsDados.CancelEdit();
                    btnDel.Text = "&Excluir";
                    btnSalva.Enabled = false;
                    btnNovo.Enabled = true;
                    btnDel.Enabled = (bdsDados.Count > 0);
                    return;
                }
                else if (bNovo)
                {
                    bdsDados.RemoveCurrent();
                    btnDel.Text = "&Excluir";
                    btnSalva.Enabled = false;
                    btnNovo.Enabled = true;
                    btnDel.Enabled = (bdsDados.Count > 0);
                    return;
                }

                Clmsg.frmP.sMsg = "Confirma Exclusão???";
                if (!Clmsg.frmP.bConf)
                {
                    dtgDados.Enabled = true;
                    return;
                }

                try
                {
                    if (!bNovo)
                    {
                        cmdBD.ExecmdProc("PPDelUsuarios", id.Trim());
                    }
                    if (cmdBD.SError == null)
                    {
                        Clmsg.frmF.sMsg = "Usuário excluído com sucesso!";
                        Clmsg.frmS.ShowDialog();
                        bNovo = false;
                        bAlte = false;
                        bdsDados.RemoveCurrent();
                    }
                    else
                    {
                        Clmsg.frmF.sMsg = "Erro exclusão!!";
                        MessageBox.Show("Erro:\r\n" + cmdBD.SError, "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }
                catch (Exception ex)
                {
                    Clmsg.frmF.sMsg = "Erro na exclusão de usuário!";
                    MessageBox.Show($"Erro:\r\n{ex.Message}", "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
                finally
                {
                    cmdBD.fechaConn();
                }
            }
        }
    }
}