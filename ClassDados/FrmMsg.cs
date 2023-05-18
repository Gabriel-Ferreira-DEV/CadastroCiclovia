using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace ClassDados
{
    public partial class FrmMsgD : Form
    {

        public bool bPisca = true;
        private string _Msg = null;
        public string sMsg
        {
            set
            {
                _Msg = value;
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

        public FrmMsgD()
        {
            InitializeComponent();
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
            Application.DoEvents();
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

        private void FrmMsg_Load(object sender, EventArgs e)
        {
        }

        private void pbx_Click(object sender, EventArgs e)
        {
            timer1.Enabled = false;
            this.Close();
        }
    }
}