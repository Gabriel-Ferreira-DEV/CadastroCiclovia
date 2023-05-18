using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using CrystalDecisions.Shared;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Windows.Forms;


namespace ClassCrystalVs2010
{
    public partial class FrmRpt : Form
    {
        public string sArquivo = "";

        public FrmRpt()
        {
            InitializeComponent();
        }

        private void FrmPDF_Load(object sender, EventArgs e)
        {
        }

        private void FrmPDF_FormClosing(object sender, FormClosingEventArgs e)
        {
            this.TopMost = false;
        }
    }
}
