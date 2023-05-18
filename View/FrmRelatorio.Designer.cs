namespace CadastrarAtletas.View
{
    partial class FrmRelatorio
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
            this.btnGerarRelatorio = new Guna.UI2.WinForms.Guna2Button();
            this.txtCpf = new Guna.UI2.WinForms.Guna2TextBox();
            this.dtpRelatorio = new Guna.UI2.WinForms.Guna2DateTimePicker();
            this.guna2GroupBox1 = new Guna.UI2.WinForms.Guna2GroupBox();
            this.ckGrafico = new Guna.UI2.WinForms.Guna2CheckBox();
            this.ckPadrao = new Guna.UI2.WinForms.Guna2CheckBox();
            this.guna2Elipse1 = new Guna.UI2.WinForms.Guna2Elipse(this.components);
            this.guna2ControlBox2 = new Guna.UI2.WinForms.Guna2ControlBox();
            this.guna2ControlBox1 = new Guna.UI2.WinForms.Guna2ControlBox();
            this.guna2HtmlLabel1 = new Guna.UI2.WinForms.Guna2HtmlLabel();
            this.guna2GroupBox1.SuspendLayout();
            this.SuspendLayout();
            // 
            // btnGerarRelatorio
            // 
            this.btnGerarRelatorio.Animated = true;
            this.btnGerarRelatorio.BorderColor = System.Drawing.Color.Aqua;
            this.btnGerarRelatorio.BorderRadius = 10;
            this.btnGerarRelatorio.BorderThickness = 1;
            this.btnGerarRelatorio.DisabledState.BorderColor = System.Drawing.Color.DarkGray;
            this.btnGerarRelatorio.DisabledState.CustomBorderColor = System.Drawing.Color.DarkGray;
            this.btnGerarRelatorio.DisabledState.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(169)))), ((int)(((byte)(169)))), ((int)(((byte)(169)))));
            this.btnGerarRelatorio.DisabledState.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(141)))), ((int)(((byte)(141)))), ((int)(((byte)(141)))));
            this.btnGerarRelatorio.FillColor = System.Drawing.Color.Aqua;
            this.btnGerarRelatorio.Font = new System.Drawing.Font("Arial", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnGerarRelatorio.ForeColor = System.Drawing.Color.White;
            this.btnGerarRelatorio.ImageAlign = System.Windows.Forms.HorizontalAlignment.Left;
            this.btnGerarRelatorio.ImageSize = new System.Drawing.Size(35, 35);
            this.btnGerarRelatorio.Location = new System.Drawing.Point(160, 85);
            this.btnGerarRelatorio.Name = "btnGerarRelatorio";
            this.btnGerarRelatorio.Size = new System.Drawing.Size(124, 45);
            this.btnGerarRelatorio.TabIndex = 5;
            this.btnGerarRelatorio.Text = "Gerar";
            this.btnGerarRelatorio.Click += new System.EventHandler(this.btnGerarRelatorio_Click_1);
            // 
            // txtCpf
            // 
            this.txtCpf.BorderColor = System.Drawing.Color.Aqua;
            this.txtCpf.BorderRadius = 8;
            this.txtCpf.Cursor = System.Windows.Forms.Cursors.IBeam;
            this.txtCpf.DefaultText = "";
            this.txtCpf.DisabledState.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(208)))), ((int)(((byte)(208)))), ((int)(((byte)(208)))));
            this.txtCpf.DisabledState.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(226)))), ((int)(((byte)(226)))), ((int)(((byte)(226)))));
            this.txtCpf.DisabledState.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(138)))), ((int)(((byte)(138)))), ((int)(((byte)(138)))));
            this.txtCpf.DisabledState.PlaceholderForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(138)))), ((int)(((byte)(138)))), ((int)(((byte)(138)))));
            this.txtCpf.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.txtCpf.FocusedState.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(94)))), ((int)(((byte)(148)))), ((int)(((byte)(255)))));
            this.txtCpf.Font = new System.Drawing.Font("Segoe UI", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txtCpf.ForeColor = System.Drawing.Color.White;
            this.txtCpf.HoverState.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(94)))), ((int)(((byte)(148)))), ((int)(((byte)(255)))));
            this.txtCpf.Location = new System.Drawing.Point(4, 28);
            this.txtCpf.Name = "txtCpf";
            this.txtCpf.PasswordChar = '\0';
            this.txtCpf.PlaceholderForeColor = System.Drawing.Color.Silver;
            this.txtCpf.PlaceholderText = "CPF";
            this.txtCpf.SelectedText = "";
            this.txtCpf.Size = new System.Drawing.Size(150, 36);
            this.txtCpf.TabIndex = 6;
            this.txtCpf.KeyUp += new System.Windows.Forms.KeyEventHandler(this.txtCpf_KeyUp);
            // 
            // dtpRelatorio
            // 
            this.dtpRelatorio.Animated = true;
            this.dtpRelatorio.BackColor = System.Drawing.Color.Transparent;
            this.dtpRelatorio.BorderColor = System.Drawing.Color.Aqua;
            this.dtpRelatorio.BorderThickness = 1;
            this.dtpRelatorio.Checked = true;
            this.dtpRelatorio.FillColor = System.Drawing.Color.Transparent;
            this.dtpRelatorio.Font = new System.Drawing.Font("Segoe UI", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.dtpRelatorio.ForeColor = System.Drawing.Color.White;
            this.dtpRelatorio.Format = System.Windows.Forms.DateTimePickerFormat.Short;
            this.dtpRelatorio.Location = new System.Drawing.Point(160, 28);
            this.dtpRelatorio.MaxDate = new System.DateTime(9998, 12, 31, 0, 0, 0, 0);
            this.dtpRelatorio.MinDate = new System.DateTime(1753, 1, 1, 0, 0, 0, 0);
            this.dtpRelatorio.Name = "dtpRelatorio";
            this.dtpRelatorio.Size = new System.Drawing.Size(124, 36);
            this.dtpRelatorio.TabIndex = 7;
            this.dtpRelatorio.Value = new System.DateTime(2023, 5, 18, 10, 45, 33, 25);
            // 
            // guna2GroupBox1
            // 
            this.guna2GroupBox1.BorderColor = System.Drawing.Color.Aqua;
            this.guna2GroupBox1.Controls.Add(this.ckGrafico);
            this.guna2GroupBox1.Controls.Add(this.ckPadrao);
            this.guna2GroupBox1.Controls.Add(this.txtCpf);
            this.guna2GroupBox1.Controls.Add(this.dtpRelatorio);
            this.guna2GroupBox1.Controls.Add(this.btnGerarRelatorio);
            this.guna2GroupBox1.CustomBorderThickness = new System.Windows.Forms.Padding(0);
            this.guna2GroupBox1.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.guna2GroupBox1.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.guna2GroupBox1.ForeColor = System.Drawing.Color.White;
            this.guna2GroupBox1.Location = new System.Drawing.Point(5, 25);
            this.guna2GroupBox1.Name = "guna2GroupBox1";
            this.guna2GroupBox1.Size = new System.Drawing.Size(292, 146);
            this.guna2GroupBox1.TabIndex = 8;
            this.guna2GroupBox1.TextOffset = new System.Drawing.Point(0, -8);
            // 
            // ckGrafico
            // 
            this.ckGrafico.AutoSize = true;
            this.ckGrafico.CheckedState.BorderColor = System.Drawing.Color.Aqua;
            this.ckGrafico.CheckedState.BorderRadius = 1;
            this.ckGrafico.CheckedState.BorderThickness = 1;
            this.ckGrafico.CheckedState.FillColor = System.Drawing.Color.Aqua;
            this.ckGrafico.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F);
            this.ckGrafico.ForeColor = System.Drawing.Color.White;
            this.ckGrafico.Location = new System.Drawing.Point(4, 106);
            this.ckGrafico.Name = "ckGrafico";
            this.ckGrafico.Size = new System.Drawing.Size(80, 24);
            this.ckGrafico.TabIndex = 10;
            this.ckGrafico.Text = "Grafico";
            this.ckGrafico.UncheckedState.BorderColor = System.Drawing.Color.Aqua;
            this.ckGrafico.UncheckedState.BorderRadius = 1;
            this.ckGrafico.UncheckedState.BorderThickness = 1;
            this.ckGrafico.UncheckedState.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.ckGrafico.Click += new System.EventHandler(this.ckGrafico_Click_1);
            // 
            // ckPadrao
            // 
            this.ckPadrao.AutoSize = true;
            this.ckPadrao.CheckedState.BorderColor = System.Drawing.Color.Aqua;
            this.ckPadrao.CheckedState.BorderRadius = 1;
            this.ckPadrao.CheckedState.BorderThickness = 1;
            this.ckPadrao.CheckedState.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(94)))), ((int)(((byte)(148)))), ((int)(((byte)(255)))));
            this.ckPadrao.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F);
            this.ckPadrao.ForeColor = System.Drawing.Color.White;
            this.ckPadrao.Location = new System.Drawing.Point(4, 76);
            this.ckPadrao.Name = "ckPadrao";
            this.ckPadrao.Size = new System.Drawing.Size(69, 24);
            this.ckPadrao.TabIndex = 9;
            this.ckPadrao.Text = "Diario";
            this.ckPadrao.UncheckedState.BorderColor = System.Drawing.Color.Aqua;
            this.ckPadrao.UncheckedState.BorderRadius = 1;
            this.ckPadrao.UncheckedState.BorderThickness = 1;
            this.ckPadrao.UncheckedState.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.ckPadrao.Click += new System.EventHandler(this.ckPadrao_Click_1);
            // 
            // guna2Elipse1
            // 
            this.guna2Elipse1.BorderRadius = 10;
            this.guna2Elipse1.TargetControl = this;
            // 
            // guna2ControlBox2
            // 
            this.guna2ControlBox2.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.guna2ControlBox2.BorderColor = System.Drawing.Color.Aqua;
            this.guna2ControlBox2.BorderThickness = 1;
            this.guna2ControlBox2.ControlBoxType = Guna.UI2.WinForms.Enums.ControlBoxType.MinimizeBox;
            this.guna2ControlBox2.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.guna2ControlBox2.IconColor = System.Drawing.Color.White;
            this.guna2ControlBox2.Location = new System.Drawing.Point(239, 3);
            this.guna2ControlBox2.Name = "guna2ControlBox2";
            this.guna2ControlBox2.Size = new System.Drawing.Size(26, 19);
            this.guna2ControlBox2.TabIndex = 65;
            // 
            // guna2ControlBox1
            // 
            this.guna2ControlBox1.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.guna2ControlBox1.BorderColor = System.Drawing.Color.Aqua;
            this.guna2ControlBox1.BorderThickness = 1;
            this.guna2ControlBox1.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.guna2ControlBox1.IconColor = System.Drawing.Color.White;
            this.guna2ControlBox1.Location = new System.Drawing.Point(271, 3);
            this.guna2ControlBox1.Name = "guna2ControlBox1";
            this.guna2ControlBox1.Size = new System.Drawing.Size(26, 19);
            this.guna2ControlBox1.TabIndex = 64;
            // 
            // guna2HtmlLabel1
            // 
            this.guna2HtmlLabel1.BackColor = System.Drawing.Color.Transparent;
            this.guna2HtmlLabel1.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.guna2HtmlLabel1.ForeColor = System.Drawing.Color.White;
            this.guna2HtmlLabel1.Location = new System.Drawing.Point(9, 13);
            this.guna2HtmlLabel1.Name = "guna2HtmlLabel1";
            this.guna2HtmlLabel1.Size = new System.Drawing.Size(67, 22);
            this.guna2HtmlLabel1.TabIndex = 66;
            this.guna2HtmlLabel1.Text = "Relatorio";
            // 
            // FrmRelatorio
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(303, 176);
            this.Controls.Add(this.guna2HtmlLabel1);
            this.Controls.Add(this.guna2ControlBox2);
            this.Controls.Add(this.guna2ControlBox1);
            this.Controls.Add(this.guna2GroupBox1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "FrmRelatorio";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Gerar";
            this.Load += new System.EventHandler(this.FrmRelatorio_Load);
            this.guna2GroupBox1.ResumeLayout(false);
            this.guna2GroupBox1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private Guna.UI2.WinForms.Guna2Button btnGerarRelatorio;
        private Guna.UI2.WinForms.Guna2TextBox txtCpf;
        private Guna.UI2.WinForms.Guna2DateTimePicker dtpRelatorio;
        private Guna.UI2.WinForms.Guna2GroupBox guna2GroupBox1;
        private Guna.UI2.WinForms.Guna2CheckBox ckGrafico;
        private Guna.UI2.WinForms.Guna2CheckBox ckPadrao;
        private Guna.UI2.WinForms.Guna2Elipse guna2Elipse1;
        private Guna.UI2.WinForms.Guna2ControlBox guna2ControlBox2;
        private Guna.UI2.WinForms.Guna2ControlBox guna2ControlBox1;
        private Guna.UI2.WinForms.Guna2HtmlLabel guna2HtmlLabel1;
    }
}