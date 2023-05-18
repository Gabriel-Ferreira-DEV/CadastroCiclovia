using CadastrarAtletas.Annotations;
using ClassDados;
using Guna.UI2.WinForms;
using Messagens;
using System;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
using System.Data;
using System.Text.RegularExpressions;
using System.Windows.Forms;

namespace CadastrarAtletas.Model
{
    internal class Atleta
    {
        [Required(ErrorMessage = "Campo Nome é obrigatorio...")] //Campo Obrigatorio
        [StringLength(70, ErrorMessage = "Nome:Valor maximo de 70 caracteres...")] // atribui um caracter maximo e um caracter minimo
        public string Nome { get; set; }

        [ValidaCpf(ErrorMessage = "CPF Invalido")]
        [Required(ErrorMessage = "Campo Cpf é obrigatorio...")]
        public string Cpf { get; set; }

        [ValidaData(ErrorMessage = "Informe uma data de nascimento válida...")]
        public string Nascimento { get; set; }
        [StringLength(20, ErrorMessage = "Sexo:Valor maximo de 20 caracteres...")]
        public string Sexo { get; set; }
        [StringLength(15, ErrorMessage = "Estado Civil:Valor maximo de 15 caracteres...")]
        public string EstadoCivil { get; set; }

        [RegularExpression(".+\\@.+\\..+", ErrorMessage = "Informe um email válido...")]
        public string Email { get; set; }
        // [StringLength(11, MinimumLength = 10, ErrorMessage = "Telefone:Valor de 11 caracteres para Celular e 10 caracteres para telefone")]
        [RegularExpression(@"^\(\d{2}\)\d{5}\-\d{4}$", ErrorMessage = "Celular invalido")]
        public string Telefone { get; set; }

        [StringLength(20, ErrorMessage = "Categoria:Valor maximo de 20 caracteres...")] 
        public string Categoria { get; set; }
        public string Tag { get; set; }
        [StringLength(70, ErrorMessage = "Logradouro:Valor maximo de 70 caracteres...")] 
        public string Logradouro { get; set; }
        [StringLength(10, ErrorMessage = "Numero:Valor maximo de 10 caracteres...")] 
        public string Numero { get; set; }
        [StringLength(50, ErrorMessage = "Bairro:Valor maximo de 50 caracteres...")] 
        public string Bairro { get; set; }  
        [StringLength(50, ErrorMessage = "Municipio:Valor maximo de 50 caracteres...")]     
        public string Municipio { get; set; }
        [StringLength(2, ErrorMessage = "UF:Valor maximo de 2 caracteres...")]  
        public string UF { get; set; }
        public string Cep { get; set; }
        [StringLength(50, ErrorMessage = "Complemento:Valor maximo de 50 caracteres...")] 
        public string Complemento { get; set; }

        private ClasseDml2 cmdBD = new ClasseDml2();
        private Messagens.ClsMessagens Clmsg = new Messagens.ClsMessagens();

        public Atleta()
        { }


        public Atleta(string nome, string cpf, string nascimento, string sexo, string estadoCivil, string email,  string categoria, string logradouro,
            string numero, string bairro, string municipio, string uF, string complemento,string telefone)
        {
            Nome = nome;
            Cpf = cpf;
            Nascimento = nascimento;
            Sexo = sexo;
            Email = email;
            EstadoCivil = estadoCivil;
            Categoria = categoria;
            Logradouro = logradouro;
            Numero = numero;
            Bairro = bairro;
            Municipio = municipio;
            UF = uF;
            Complemento = complemento;
            Telefone = telefone;
   
        }

        public bool ValidaCEP(string cep)
        {
            Regex Rgx = new Regex(@"^\d{5}-\d{3}$");

            if (!Rgx.IsMatch(cep))
            {
                MessageBox.Show("Cep inválido", "Erro", MessageBoxButtons.OK, MessageBoxIcon.Error);

                return false;
            }
            else
            {
                return true;
            }
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

        public bool updatBds(ref BindingSource binds, string sProc, string sParam)
        {
            if (conectaBd())
            {
                try
                {
                    DataSet ds = cmdBD.Excsel(sProc, sParam);
                    if (ds != null)
                    {
                        binds.DataSource = ds;
                        binds.DataMember = ds.Tables[0].TableName;
                        return true;
                    }
                    else
                        return false;
                }
                catch (Exception e)
                {
                    string sErrp = e.Message;
                    MessageBox.Show(sErrp, "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public bool CadastrarAtleta(bool bNovo, BindingSource bdsDados, string sParam, string id)
        {
            if (conectaBd())
            {
                if (bNovo)
                {
                    cmdBD.ExecmdProc("PPInsAtletas", sParam);
                }
                else if (bNovo == false)
                {
                    string sParamUpd = id + "," + sParam;
                    cmdBD.ExecmdProc("PPUpAtletas", sParamUpd);
                }

                if (cmdBD.SError == null)
                {
                    Clmsg.frmS.ShowDialog();
                    updatBds(ref bdsDados, "PPSeAtletas", "");
                    return true;
                }
                else
                {
                    Clmsg.frmF.ShowDialog();
                    MessageBox.Show(cmdBD.SError, "Erro", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return false;
                }
            }
            else { return false; }
        }

        public void DeletarAtleta(bool bNovo, bool bAlte, Guna2Button btnDel, Guna2Button btnSalva, Guna2Button btnNovo, BindingSource bdsDados, string id, DataGridView dtgDados, Form form)
        {
            if (conectaBd())
            {
                if ((bAlte) && (!bNovo))
                {
                    bdsDados.CancelEdit();
                    btnDel.Text = "&Excluir";
                    btnSalva.Enabled = false;
                    btnNovo.Enabled = true;
                    btnDel.Enabled = (bdsDados.Count > 0);
                    return;
                }
                if (bNovo)
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

                if (!(bNovo))
                {
                    cmdBD.ExecmdProc("PPDelAtleta", id);
                }
                if (cmdBD.SError == null)
                {
                    Clmsg.frmS.ShowDialog();
                    bNovo = false;
                    bAlte = false;
                    bdsDados.RemoveCurrent();
                }
                else
                {
                    foreach (Control c in form.Controls)
                    {
                        if (c is TextBox)
                            c.Text = "";
                    }
                    Clmsg.frmF.sMsg = "Erro exclusão!!";
                    MessageBox.Show("Erro:\r\n" + cmdBD.SError, "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return;
                }
            }
        }

        public void CadastrarTags(bool bNovo, string tag, bool bAlte, BindingSource bdsDados, string id, string sParam)
        {
            if (conectaBd())
            {
                cmdBD.ExecmdProc("PPInsTag", sParam);

                if (cmdBD.SError == null)
                {
                    Clmsg.frmS.ShowDialog();
                    bNovo = false;
                    bAlte = false;
                    updatBds(ref bdsDados, "PPAtletas", "");
                }
                else
                {
                    Clmsg.frmF.ShowDialog();
                    MessageBox.Show(cmdBD.SError, "Erro", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        public bool EditarTags(string sParam, BindingSource bdsDados)
        {
            if (conectaBd())
            {
                cmdBD.ExecmdProc("PPUpTag", sParam);

                if (cmdBD.SError == null)
                {
                    Clmsg.frmS.ShowDialog();
                    updatBds(ref bdsDados, "PPAtletas", "");
                    return true;
                }
                else
                {
                    Clmsg.frmF.ShowDialog();
                    MessageBox.Show(cmdBD.SError, "Erro", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
    }
}