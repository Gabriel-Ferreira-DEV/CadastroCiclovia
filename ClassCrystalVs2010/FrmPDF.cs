using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Windows.Forms;

namespace ClassCrystalVs2010
{
    public partial class FrmPDF : Form
    {
        public string sArquivo = "";
        public DataSet dts;

        public FrmPDF()
        {
            InitializeComponent();
        }

        private void FrmPDF_Load(object sender, EventArgs e)
        {
           // webBrowser1.Navigate(sArquivo);
            axAcroPDF1.LoadFile(sArquivo);
            try
            {
                dtgDados.DataSource = dts.Tables[0];
            }
            catch { };
        }

        private void FrmPDF_FormClosing(object sender, FormClosingEventArgs e)
        {
            this.TopMost = false;
        }
    }
}
