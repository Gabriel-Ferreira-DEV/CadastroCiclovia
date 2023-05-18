using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace RegrasNegocio
{
    public partial class FrmSucessoMin : Form
    {
        public FrmSucessoMin()
        {
            InitializeComponent();
            string sExe = Application.ExecutablePath.ToString();
            try
            {
                this.BackgroundImage = new Bitmap(@".\btn\FundoM.png");
            }
            catch { }
        }

        private void FrmSucesso_KeyDown(object sender, KeyEventArgs e)
        {
            this.Close();
        }

        private void FrmSucesso_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void FrmSucesso_Load(object sender, EventArgs e)
        {
            //this.Close();
        }
    }
}