namespace RegrasNegocio
{
    partial class FrmPergMin
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
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FrmPergMin));
            this.lbl1 = new System.Windows.Forms.Label();
            this.timer1 = new System.Windows.Forms.Timer(this.components);
            this.pbx = new System.Windows.Forms.PictureBox();
            this.btnOk = new System.Windows.Forms.Button();
            this.btnCanc = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.pbx)).BeginInit();
            this.SuspendLayout();
            // 
            // lbl1
            // 
            this.lbl1.BackColor = System.Drawing.Color.Transparent;
            this.lbl1.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lbl1.ForeColor = System.Drawing.Color.Yellow;
            this.lbl1.Location = new System.Drawing.Point(3, 7);
            this.lbl1.Name = "lbl1";
            this.lbl1.Size = new System.Drawing.Size(238, 21);
            this.lbl1.TabIndex = 2;
            this.lbl1.Text = "Alerta";
            this.lbl1.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lbl1.Click += new System.EventHandler(this.FrmFalha_Click);
            // 
            // timer1
            // 
            this.timer1.Interval = 500;
            this.timer1.Tick += new System.EventHandler(this.timer1_Tick);
            // 
            // pbx
            // 
            this.pbx.BackColor = System.Drawing.Color.Transparent;
            this.pbx.Image = ((System.Drawing.Image)(resources.GetObject("pbx.Image")));
            this.pbx.Location = new System.Drawing.Point(237, 7);
            this.pbx.Name = "pbx";
            this.pbx.Size = new System.Drawing.Size(47, 47);
            this.pbx.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pbx.TabIndex = 3;
            this.pbx.TabStop = false;
            // 
            // btnOk
            // 
            this.btnOk.BackColor = System.Drawing.SystemColors.Control;
            this.btnOk.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.btnOk.Cursor = System.Windows.Forms.Cursors.Hand;
            this.btnOk.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnOk.ForeColor = System.Drawing.Color.White;
            this.btnOk.Image = global::Messagens.Properties.Resources.Plano03;
            this.btnOk.Location = new System.Drawing.Point(36, 35);
            this.btnOk.Name = "btnOk";
            this.btnOk.Size = new System.Drawing.Size(75, 26);
            this.btnOk.TabIndex = 4;
            this.btnOk.Text = "&Confirmar";
            this.btnOk.UseVisualStyleBackColor = false;
            this.btnOk.Click += new System.EventHandler(this.btnOk_Click);
            this.btnOk.Enter += new System.EventHandler(this.btnOk_Enter);
            this.btnOk.Leave += new System.EventHandler(this.btnOk_Leave);
            // 
            // btnCanc
            // 
            this.btnCanc.BackColor = System.Drawing.SystemColors.Control;
            this.btnCanc.Cursor = System.Windows.Forms.Cursors.Hand;
            this.btnCanc.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnCanc.ForeColor = System.Drawing.Color.White;
            this.btnCanc.Image = global::Messagens.Properties.Resources.Plano03;
            this.btnCanc.Location = new System.Drawing.Point(147, 35);
            this.btnCanc.Name = "btnCanc";
            this.btnCanc.Size = new System.Drawing.Size(75, 26);
            this.btnCanc.TabIndex = 5;
            this.btnCanc.Text = "Cancelar";
            this.btnCanc.UseVisualStyleBackColor = false;
            this.btnCanc.Click += new System.EventHandler(this.btnCanc_Click);
            this.btnCanc.Enter += new System.EventHandler(this.btnCanc_Enter);
            this.btnCanc.Leave += new System.EventHandler(this.btnCanc_Leave);
            // 
            // FrmPergMin
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Blue;
            this.BackgroundImage = global::Messagens.Properties.Resources.Plano500x85;
            this.ClientSize = new System.Drawing.Size(287, 64);
            this.Controls.Add(this.btnCanc);
            this.Controls.Add(this.btnOk);
            this.Controls.Add(this.pbx);
            this.Controls.Add(this.lbl1);
            this.Cursor = System.Windows.Forms.Cursors.Default;
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "FrmPergMin";
            this.ShowInTaskbar = false;
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Confirmação Sistema";
            this.TopMost = true;
            this.Activated += new System.EventHandler(this.FrmAlerta_Activated);
            this.Load += new System.EventHandler(this.FrmPergMin_Load);
            this.Shown += new System.EventHandler(this.FrmPerg_Shown);
            this.Click += new System.EventHandler(this.FrmFalha_Click);
            this.KeyDown += new System.Windows.Forms.KeyEventHandler(this.FrmSucesso_KeyDown);
            ((System.ComponentModel.ISupportInitialize)(this.pbx)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Label lbl1;
        private System.Windows.Forms.Timer timer1;
        private System.Windows.Forms.PictureBox pbx;
        private System.Windows.Forms.Button btnOk;
        private System.Windows.Forms.Button btnCanc;
    }
}