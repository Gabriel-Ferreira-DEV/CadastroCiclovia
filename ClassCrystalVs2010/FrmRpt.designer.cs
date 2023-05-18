namespace ClassCrystalVs2010
{
    partial class FrmRpt
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FrmRpt));
            this.crpW = new CrystalDecisions.Windows.Forms.CrystalReportViewer();
            this.SuspendLayout();
            // 
            // crpW
            // 
            this.crpW.ActiveViewIndex = -1;
            this.crpW.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.crpW.Dock = System.Windows.Forms.DockStyle.Fill;
            this.crpW.Location = new System.Drawing.Point(0, 0);
            this.crpW.Name = "crpW";
            this.crpW.SelectionFormula = "";
            this.crpW.Size = new System.Drawing.Size(1050, 688);
            this.crpW.TabIndex = 0;
            this.crpW.ViewTimeSelectionFormula = "";
            // 
            // FrmRpt
            // 
            this.ClientSize = new System.Drawing.Size(1050, 688);
            this.Controls.Add(this.crpW);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "FrmRpt";
            this.ResumeLayout(false);

        }

        #endregion

        public CrystalDecisions.Windows.Forms.CrystalReportViewer crpW;



    }
}