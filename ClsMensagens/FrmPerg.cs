using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace RegrasNegocio
{
    public partial class FrmPerg : Form
    {
        public bool bConf = false;
        public bool bPisca = true;
        private string _Msg = null;
        public string sMsg
        {
            set
            {
                _Msg = value;
                btnCanc.Focus();
                this.ShowDialog();
            }
        }

        public string sMsg2
        {
            set
            {
                _Msg = value;
                this.Show();
            }
        }

        public FrmPerg()
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
            this.Close();
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            if (bPisca)
                lbl1.Visible = !lbl1.Visible;
            else
            {
                pbx.Visible = true;
                lbl1.Visible = true;
            }
        }

        private void FrmFalha_Click(object sender, EventArgs e)
        {
        }

        private void FrmAlerta_Activated(object sender, EventArgs e)
        {
            lbl1.Text = _Msg;
            lbl1.Refresh();
            timer1.Enabled = true;
        }

        private void btnOk_Click(object sender, EventArgs e)
        {
            timer1.Enabled = false;
            bConf = true;
            this.Close();
        }

        private void btnCanc_Click(object sender, EventArgs e)
        {
            timer1.Enabled = false;
            this.Close();
        }

        private void FrmPerg_Shown(object sender, EventArgs e)
        {
            btnOk.Focus();
        }

        private void btnOk_Enter(object sender, EventArgs e)
        {
            btnOk.ForeColor = Color.Black;
        }

        private void btnCanc_Enter(object sender, EventArgs e)
        {
            btnCanc.ForeColor = Color.Black;
        }

        private void btnOk_Leave(object sender, EventArgs e)
        {
            btnOk.ForeColor = Color.Navy;
        }

        private void btnCanc_Leave(object sender, EventArgs e)
        {
            btnCanc.ForeColor = Color.Navy;
        }

        private void FrmPerg_Load(object sender, EventArgs e)
        {

        }
    }
}