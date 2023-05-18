using ClassCrystalVs2010;
using CrystalDecisions.CrystalReports.Engine;
using System;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.IO;
using System.Windows.Forms;

namespace CadastrarAtletas.View
{
    public partial class FrmRelatorio : Form
    {
        string sRpt = "";
        public FrmRelatorio()
        {
            InitializeComponent();
        }

        private void btnGerarRelatorio_Click(object sender, EventArgs e)
        {
            string sCpf =   txtCpf.Text;    
            if (sCpf == string.Empty)
            {
                MessageBox.Show("Campo CPF Obrigatorio", "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            else
            {
                csCrystal cmd = new csCrystal();
                ReportDocument rpt = new ReportDocument();
                if (ckPadrao.Checked)
                {
                    string sDir = Path.GetDirectoryName(Application.ExecutablePath);
                    sRpt = Path.Combine(sDir, @"Report\RelatórioCicloVia.rpt");
                    DataSet dts = new DataSet();
                    cmd.sUsr = ConfigurationManager.AppSettings["User"].ToString();
                    cmd.sPwd = ConfigurationManager.AppSettings["PwdServidor"].ToString();
                    cmd.sServidorSql = ConfigurationManager.AppSettings["Servidor-Sql"].ToString();
                    cmd.sBancoSql = ConfigurationManager.AppSettings["Banco"].ToString();
                    cmd.sParam1 = sCpf;
                    cmd.sParam2 = dtpRelatorio.Text.Trim();
                    cmd.excRpt(sRpt, dts, null, true);
                }
                else if (ckGrafico.Checked)
                {
                    string sDir = Path.GetDirectoryName(Application.ExecutablePath);
                    sRpt = Path.Combine(sDir, @"Report\RelatórioGrafico.rpt");
                    DataSet dts = new DataSet();
                    cmd.sUsr = ConfigurationManager.AppSettings["User"].ToString();
                    cmd.sPwd = ConfigurationManager.AppSettings["PwdServidor"].ToString();
                    cmd.sServidorSql = ConfigurationManager.AppSettings["Servidor-Sql"].ToString();
                    cmd.sBancoSql = ConfigurationManager.AppSettings["Banco"].ToString();
                    cmd.sParam1 = sCpf;
                    cmd.excRpt(sRpt, dts, null, true);
                }
                else
                {
                    MessageBox.Show("Selecione um modelo de Relatorio", "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    return;
                }
            }

        }

        private void ckGrafico_Click(object sender, EventArgs e)
        {
            if (ckGrafico.Checked)
            {
                dtpRelatorio.Enabled = false;
                ckPadrao.Enabled = false;
            }
            else
            {
                dtpRelatorio.Enabled = false;
                ckPadrao.Enabled = true;
            }
        }

        private void FrmRelatorio_Load(object sender, EventArgs e)
        {

        }

        private void ckPadrao_Click(object sender, EventArgs e)
        {
            if (ckPadrao.Checked)
            {
                dtpRelatorio.Enabled = true;
                ckGrafico.Enabled = false;
            }
            else
            {
                dtpRelatorio.Enabled = false;
                ckGrafico.Enabled = true;
            }
        }
        void mudaCor(object sender)
        {

            string sTipo = sender.GetType().ToString();
            if (sTipo.Contains("MaskedTextBox"))
            {
                ((MaskedTextBox)sender).BackColor = Color.LightGreen;

            }
            else if (sTipo.Contains("TextBox"))
            {

                ((TextBox)sender).BackColor = Color.LightGreen;

            }
            else if (sTipo.Contains("ComboBox"))
            {
                ((ComboBox)sender).BackColor = Color.LightGreen;

            }

        }

        private void maskedTextBoxCpf_KeyUp(object sender, KeyEventArgs e)
        {
            mudaCor(txtCpf);
            btnGerarRelatorio.Enabled = true;

        }

        private void btnGerarRelatorio_Click_1(object sender, EventArgs e)
        {
            string sCpf = txtCpf.Text;
            if (sCpf == string.Empty)
            {
                MessageBox.Show("Campo CPF Obrigatorio", "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            else
            {
                csCrystal cmd = new csCrystal();
                ReportDocument rpt = new ReportDocument();
                if (ckPadrao.Checked)
                {
                    string sDir = Path.GetDirectoryName(Application.ExecutablePath);
                    sRpt = Path.Combine(sDir, @"Report\RelatórioCicloVia.rpt");
                    DataSet dts = new DataSet();
                    cmd.sUsr = ConfigurationManager.AppSettings["User"].ToString();
                    cmd.sPwd = ConfigurationManager.AppSettings["PwdServidor"].ToString();
                    cmd.sServidorSql = ConfigurationManager.AppSettings["Servidor-Sql"].ToString();
                    cmd.sBancoSql = ConfigurationManager.AppSettings["Banco"].ToString();
                    cmd.sParam1 = sCpf;
                    cmd.sParam2 = dtpRelatorio.Text.Trim();
                    cmd.excRpt(sRpt, dts, null, true);
                }
                else if (ckGrafico.Checked)
                {
                    string sDir = Path.GetDirectoryName(Application.ExecutablePath);
                    sRpt = Path.Combine(sDir, @"Report\RelatórioGrafico.rpt");
                    DataSet dts = new DataSet();
                    cmd.sUsr = ConfigurationManager.AppSettings["User"].ToString();
                    cmd.sPwd = ConfigurationManager.AppSettings["PwdServidor"].ToString();
                    cmd.sServidorSql = ConfigurationManager.AppSettings["Servidor-Sql"].ToString();
                    cmd.sBancoSql = ConfigurationManager.AppSettings["Banco"].ToString();
                    cmd.sParam1 = sCpf;
                    cmd.excRpt(sRpt, dts, null, true);
                }
                else
                {
                    MessageBox.Show("Selecione um modelo de Relatorio", "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    return;
                }
            }
        }

        private void maskedTextBoxCpf_MaskInputRejected(object sender, MaskInputRejectedEventArgs e)
        {

        }

        private void txtCpf_KeyUp(object sender, KeyEventArgs e)
        {
            mudaCor(txtCpf);
            btnGerarRelatorio.Enabled = true;
        }

        private void ckPadrao_Click_1(object sender, EventArgs e)
        {
            if (ckPadrao.Checked)
            {
                dtpRelatorio.Enabled = true;
                ckGrafico.Enabled = false;
            }
            else
            {
                dtpRelatorio.Enabled = false;
                ckGrafico.Enabled = true;
            }
        }

        private void ckGrafico_Click_1(object sender, EventArgs e)
        {
            if (ckGrafico.Checked)
            {
                dtpRelatorio.Enabled = false;
                ckPadrao.Enabled = false;
            }
            else
            {
                dtpRelatorio.Enabled = false;
                ckPadrao.Enabled = true;
            }
        }
    }
}
