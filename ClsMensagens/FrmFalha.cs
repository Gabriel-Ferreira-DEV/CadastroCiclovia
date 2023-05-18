using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace RegrasNegocio
{
    public partial class FrmFalha : Form
    {
        private string sMensagem = "";
        public string sMsg 
        {
            get
            {
                return sMensagem;
            }
            set
            {
                sMensagem = value;
                lbl1.Text = value;
                lbl2.Text = value;
            }
        }        
  

        public FrmFalha()
        {
            InitializeComponent();
            try
            {
                this.BackgroundImage = new Bitmap(@".\btn\FundoM.png");
            }
            catch { }
        }

        private void FrmSucesso_KeyDown(object sender, KeyEventArgs e)
        {
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            lbl1.Visible = !lbl1.Visible;
            lbl2.Visible = lbl1.Visible;
        }

        private void FrmFalha_Click(object sender, EventArgs e)
        {
            timer1.Enabled = false;
            this.Close();
        }

        private void FrmFalha_Load(object sender, EventArgs e)
        {
            
        }

        private void FrmFalha_Activated(object sender, EventArgs e)
        {
            timer1.Enabled = true;
        }

        private void FrmFalha_KeyPress(object sender, KeyPressEventArgs e)
        {
            timer1.Enabled = false;
            this.Close();
        }
    }
}