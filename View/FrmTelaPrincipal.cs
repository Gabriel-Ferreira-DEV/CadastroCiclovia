using Cadastro.View;
using ProgramadorBBB;
using System;
using System.Windows.Forms;

namespace CadastrarAtletas.View
{
    public partial class FrmTelaPrincipal : Form
    {
        string sNivel = "";
        public FrmTelaPrincipal(string nivel)
        {
            InitializeComponent();
            sNivel = nivel;
    
        }


        private void backgroundWorker1_DoWork(object sender, System.ComponentModel.DoWorkEventArgs e)
        {

        }

        private void cadastrosToolStripMenuItem_Click(object sender, EventArgs e)
        {

        }

        private void FrmTelaPrincipal_Load(object sender, EventArgs e)
        {
            if (sNivel == "2")
            {
                gunaBtnUsuarios.Enabled = false;
            }
        }

        private void btnCadastros_Click(object sender, EventArgs e)
        {
            this.Hide();
            FrmCadCorredores frmCadCorredores = new FrmCadCorredores();
            frmCadCorredores.ShowDialog();
            this.Show();
        }

        private void btnUsuarios_Click(object sender, EventArgs e)
        {
            this.Hide();
            FrmCadUsuarios frmCadUsuarios = new FrmCadUsuarios();
            frmCadUsuarios.ShowDialog();
            this.Show();
        }

        private void btnRelatorio_Click(object sender, EventArgs e)
        { 
            this.Hide();
            FrmRelatorio relatorio = new FrmRelatorio();
            relatorio.ShowDialog();
            this.Show();
        }

        private void gunaBtnCadastro_Click(object sender, EventArgs e)
        {
            this.Hide();
            FrmCadCorredores frmCadCorredores = new FrmCadCorredores();
            frmCadCorredores.ShowDialog();
            this.Show();
        }

        private void gunaBtnUsuario_Click(object sender, EventArgs e)
        {
            this.Hide();
            FrmCadUsuarios frmCadUsuarios = new FrmCadUsuarios();
            frmCadUsuarios.ShowDialog();
            this.Show();
        }

        private void gunaBtnRelatorios_Click(object sender, EventArgs e)
        {
            this.Hide();
            FrmRelatorio relatorio = new FrmRelatorio();
            relatorio.ShowDialog();
            this.Show();
        }
    }
}
