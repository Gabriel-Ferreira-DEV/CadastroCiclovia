using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace RegrasNegocio
{
    public partial class FrmAlerta : Form
    {

        private string _Msg = null;
        public string sMsg
        {
            set
            {
                _Msg = value;
                this.ShowDialog();
            }
        }


        public FrmAlerta()
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
        }

        private void FrmFalha_Click(object sender, EventArgs e)
        {
            timer1.Enabled = false;
            this.Close();
        }

        private void FrmAlerta_Activated(object sender, EventArgs e)
        {
            lbl1.Text = _Msg;
            lbl1.Refresh();
            timer1.Enabled = true;
        }

        private void FrmAlerta_Load(object sender, EventArgs e)
        {

        }

        private void FrmAlerta_Enter(object sender, EventArgs e)
        {
        }

        private void FrmAlerta_KeyPress(object sender, KeyPressEventArgs e)
        {
            timer1.Enabled = false;
            this.Close();

        }
    }
}