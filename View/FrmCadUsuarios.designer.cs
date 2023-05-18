namespace ProgramadorBBB
{
    partial class FrmCadUsuarios
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
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle1 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle2 = new System.Windows.Forms.DataGridViewCellStyle();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FrmCadUsuarios));
            this.label5 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.lblId = new System.Windows.Forms.Label();
            this.dtgDados = new System.Windows.Forms.DataGridView();
            this.DomGrupo = new System.Windows.Forms.Label();
            this.lblStatus = new System.Windows.Forms.Label();
            this.guna2GroupBox1 = new Guna.UI2.WinForms.Guna2GroupBox();
            this.btnDel = new Guna.UI2.WinForms.Guna2Button();
            this.btnPrimeiro = new Guna.UI2.WinForms.Guna2Button();
            this.btnSalva = new Guna.UI2.WinForms.Guna2Button();
            this.btnProximo = new Guna.UI2.WinForms.Guna2Button();
            this.btnNovo = new Guna.UI2.WinForms.Guna2Button();
            this.btnAnterior = new Guna.UI2.WinForms.Guna2Button();
            this.btnUltimo = new Guna.UI2.WinForms.Guna2Button();
            this.guna2GroupBox2 = new Guna.UI2.WinForms.Guna2GroupBox();
            this.ckAdministrador = new Guna.UI2.WinForms.Guna2CheckBox();
            this.ckBasico = new Guna.UI2.WinForms.Guna2CheckBox();
            this.gpDado = new Guna.UI2.WinForms.Guna2GroupBox();
            this.DomAtivo = new Guna.UI2.WinForms.Guna2TextBox();
            this.TxtLogin = new Guna.UI2.WinForms.Guna2TextBox();
            this.guna2GroupBox3 = new Guna.UI2.WinForms.Guna2GroupBox();
            this.guna2ControlBox2 = new Guna.UI2.WinForms.Guna2ControlBox();
            this.guna2ControlBox1 = new Guna.UI2.WinForms.Guna2ControlBox();
            this.guna2Elipse1 = new Guna.UI2.WinForms.Guna2Elipse(this.components);
            this.label2 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.NomUsuario = new Guna.UI2.WinForms.Guna2TextBox();
            ((System.ComponentModel.ISupportInitialize)(this.dtgDados)).BeginInit();
            this.guna2GroupBox1.SuspendLayout();
            this.guna2GroupBox2.SuspendLayout();
            this.gpDado.SuspendLayout();
            this.guna2GroupBox3.SuspendLayout();
            this.SuspendLayout();
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label5.ForeColor = System.Drawing.Color.White;
            this.label5.Location = new System.Drawing.Point(576, 12);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(69, 16);
            this.label5.TabIndex = 108;
            this.label5.Text = "Ativo S/N:";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label3.ForeColor = System.Drawing.Color.White;
            this.label3.Location = new System.Drawing.Point(296, 12);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(47, 16);
            this.label3.TabIndex = 104;
            this.label3.Text = "Login:";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.ForeColor = System.Drawing.Color.White;
            this.label1.Location = new System.Drawing.Point(3, 12);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(59, 16);
            this.label1.TabIndex = 1;
            this.label1.Text = "Usuário:";
            // 
            // lblId
            // 
            this.lblId.AutoSize = true;
            this.lblId.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblId.Location = new System.Drawing.Point(833, 3);
            this.lblId.Name = "lblId";
            this.lblId.Size = new System.Drawing.Size(31, 16);
            this.lblId.TabIndex = 4;
            this.lblId.Text = "000";
            this.lblId.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // dtgDados
            // 
            this.dtgDados.AllowUserToAddRows = false;
            this.dtgDados.AllowUserToDeleteRows = false;
            this.dtgDados.AllowUserToResizeColumns = false;
            this.dtgDados.AllowUserToResizeRows = false;
            dataGridViewCellStyle1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(192)))));
            this.dtgDados.AlternatingRowsDefaultCellStyle = dataGridViewCellStyle1;
            this.dtgDados.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.dtgDados.BackgroundColor = System.Drawing.Color.White;
            this.dtgDados.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dtgDados.Location = new System.Drawing.Point(4, 3);
            this.dtgDados.Name = "dtgDados";
            this.dtgDados.RowHeadersVisible = false;
            dataGridViewCellStyle2.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.dtgDados.RowsDefaultCellStyle = dataGridViewCellStyle2;
            this.dtgDados.Size = new System.Drawing.Size(878, 325);
            this.dtgDados.TabIndex = 30;
            // 
            // DomGrupo
            // 
            this.DomGrupo.AutoSize = true;
            this.DomGrupo.Font = new System.Drawing.Font("Calibri", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.DomGrupo.ForeColor = System.Drawing.Color.White;
            this.DomGrupo.Location = new System.Drawing.Point(502, 98);
            this.DomGrupo.Name = "DomGrupo";
            this.DomGrupo.Size = new System.Drawing.Size(64, 15);
            this.DomGrupo.TabIndex = 109;
            this.DomGrupo.Text = "Ativo S/N:";
            this.DomGrupo.TextChanged += new System.EventHandler(this.DomGrupo_TextChanged);
            // 
            // lblStatus
            // 
            this.lblStatus.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.lblStatus.BackColor = System.Drawing.Color.Transparent;
            this.lblStatus.Font = new System.Drawing.Font("Arial", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblStatus.ForeColor = System.Drawing.Color.White;
            this.lblStatus.Location = new System.Drawing.Point(12, 182);
            this.lblStatus.Name = "lblStatus";
            this.lblStatus.Size = new System.Drawing.Size(885, 23);
            this.lblStatus.TabIndex = 6;
            this.lblStatus.Text = "Status";
            this.lblStatus.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // guna2GroupBox1
            // 
            this.guna2GroupBox1.BorderColor = System.Drawing.Color.Aqua;
            this.guna2GroupBox1.BorderRadius = 6;
            this.guna2GroupBox1.Controls.Add(this.btnDel);
            this.guna2GroupBox1.Controls.Add(this.btnPrimeiro);
            this.guna2GroupBox1.Controls.Add(this.btnSalva);
            this.guna2GroupBox1.Controls.Add(this.btnProximo);
            this.guna2GroupBox1.Controls.Add(this.btnNovo);
            this.guna2GroupBox1.Controls.Add(this.btnAnterior);
            this.guna2GroupBox1.Controls.Add(this.btnUltimo);
            this.guna2GroupBox1.CustomBorderThickness = new System.Windows.Forms.Padding(0);
            this.guna2GroupBox1.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.guna2GroupBox1.Font = new System.Drawing.Font("Segoe UI", 9F);
            this.guna2GroupBox1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(125)))), ((int)(((byte)(137)))), ((int)(((byte)(149)))));
            this.guna2GroupBox1.Location = new System.Drawing.Point(12, 30);
            this.guna2GroupBox1.Name = "guna2GroupBox1";
            this.guna2GroupBox1.Size = new System.Drawing.Size(885, 53);
            this.guna2GroupBox1.TabIndex = 62;
            // 
            // btnDel
            // 
            this.btnDel.Animated = true;
            this.btnDel.BorderColor = System.Drawing.Color.Aqua;
            this.btnDel.BorderRadius = 8;
            this.btnDel.BorderThickness = 1;
            this.btnDel.DisabledState.BorderColor = System.Drawing.Color.DarkGray;
            this.btnDel.DisabledState.CustomBorderColor = System.Drawing.Color.DarkGray;
            this.btnDel.DisabledState.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(169)))), ((int)(((byte)(169)))), ((int)(((byte)(169)))));
            this.btnDel.DisabledState.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(141)))), ((int)(((byte)(141)))), ((int)(((byte)(141)))));
            this.btnDel.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.btnDel.Font = new System.Drawing.Font("Segoe UI", 12.75F, System.Drawing.FontStyle.Bold);
            this.btnDel.ForeColor = System.Drawing.Color.White;
            this.btnDel.Image = ((System.Drawing.Image)(resources.GetObject("btnDel.Image")));
            this.btnDel.ImageAlign = System.Windows.Forms.HorizontalAlignment.Left;
            this.btnDel.ImageSize = new System.Drawing.Size(38, 38);
            this.btnDel.Location = new System.Drawing.Point(755, 5);
            this.btnDel.Name = "btnDel";
            this.btnDel.Size = new System.Drawing.Size(122, 45);
            this.btnDel.TabIndex = 68;
            this.btnDel.Text = "Excluir";
            this.btnDel.TextAlign = System.Windows.Forms.HorizontalAlignment.Right;
            this.btnDel.TextOffset = new System.Drawing.Point(-3, 0);
            this.btnDel.Click += new System.EventHandler(this.guna2Button1_Click);
            // 
            // btnPrimeiro
            // 
            this.btnPrimeiro.Animated = true;
            this.btnPrimeiro.BorderColor = System.Drawing.Color.Aqua;
            this.btnPrimeiro.BorderRadius = 8;
            this.btnPrimeiro.BorderThickness = 1;
            this.btnPrimeiro.DisabledState.BorderColor = System.Drawing.Color.DarkGray;
            this.btnPrimeiro.DisabledState.CustomBorderColor = System.Drawing.Color.DarkGray;
            this.btnPrimeiro.DisabledState.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(169)))), ((int)(((byte)(169)))), ((int)(((byte)(169)))));
            this.btnPrimeiro.DisabledState.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(141)))), ((int)(((byte)(141)))), ((int)(((byte)(141)))));
            this.btnPrimeiro.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.btnPrimeiro.Font = new System.Drawing.Font("Segoe UI", 12.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnPrimeiro.ForeColor = System.Drawing.Color.White;
            this.btnPrimeiro.Image = ((System.Drawing.Image)(resources.GetObject("btnPrimeiro.Image")));
            this.btnPrimeiro.ImageSize = new System.Drawing.Size(35, 35);
            this.btnPrimeiro.Location = new System.Drawing.Point(5, 5);
            this.btnPrimeiro.Name = "btnPrimeiro";
            this.btnPrimeiro.Size = new System.Drawing.Size(122, 45);
            this.btnPrimeiro.TabIndex = 69;
            this.btnPrimeiro.Text = "Primeiro";
            this.btnPrimeiro.Click += new System.EventHandler(this.btnPrimeiro_Click_2);
            // 
            // btnSalva
            // 
            this.btnSalva.Animated = true;
            this.btnSalva.BorderColor = System.Drawing.Color.Aqua;
            this.btnSalva.BorderRadius = 8;
            this.btnSalva.BorderThickness = 1;
            this.btnSalva.DisabledState.BorderColor = System.Drawing.Color.DarkGray;
            this.btnSalva.DisabledState.CustomBorderColor = System.Drawing.Color.DarkGray;
            this.btnSalva.DisabledState.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(169)))), ((int)(((byte)(169)))), ((int)(((byte)(169)))));
            this.btnSalva.DisabledState.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(141)))), ((int)(((byte)(141)))), ((int)(((byte)(141)))));
            this.btnSalva.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.btnSalva.Font = new System.Drawing.Font("Segoe UI", 12.75F, System.Drawing.FontStyle.Bold);
            this.btnSalva.ForeColor = System.Drawing.Color.White;
            this.btnSalva.Image = ((System.Drawing.Image)(resources.GetObject("btnSalva.Image")));
            this.btnSalva.ImageSize = new System.Drawing.Size(35, 35);
            this.btnSalva.Location = new System.Drawing.Point(630, 5);
            this.btnSalva.Name = "btnSalva";
            this.btnSalva.Size = new System.Drawing.Size(122, 45);
            this.btnSalva.TabIndex = 67;
            this.btnSalva.Text = "Salvar";
            this.btnSalva.TextOffset = new System.Drawing.Point(2, 0);
            this.btnSalva.Click += new System.EventHandler(this.btnSalva_Click_2);
            // 
            // btnProximo
            // 
            this.btnProximo.Animated = true;
            this.btnProximo.BorderColor = System.Drawing.Color.Aqua;
            this.btnProximo.BorderRadius = 8;
            this.btnProximo.BorderThickness = 1;
            this.btnProximo.DisabledState.BorderColor = System.Drawing.Color.DarkGray;
            this.btnProximo.DisabledState.CustomBorderColor = System.Drawing.Color.DarkGray;
            this.btnProximo.DisabledState.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(169)))), ((int)(((byte)(169)))), ((int)(((byte)(169)))));
            this.btnProximo.DisabledState.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(141)))), ((int)(((byte)(141)))), ((int)(((byte)(141)))));
            this.btnProximo.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.btnProximo.Font = new System.Drawing.Font("Segoe UI", 12.75F, System.Drawing.FontStyle.Bold);
            this.btnProximo.ForeColor = System.Drawing.Color.White;
            this.btnProximo.Image = ((System.Drawing.Image)(resources.GetObject("btnProximo.Image")));
            this.btnProximo.ImageAlign = System.Windows.Forms.HorizontalAlignment.Left;
            this.btnProximo.ImageSize = new System.Drawing.Size(35, 35);
            this.btnProximo.Location = new System.Drawing.Point(255, 5);
            this.btnProximo.Name = "btnProximo";
            this.btnProximo.Size = new System.Drawing.Size(122, 45);
            this.btnProximo.TabIndex = 63;
            this.btnProximo.Text = "Proximo";
            this.btnProximo.TextAlign = System.Windows.Forms.HorizontalAlignment.Right;
            this.btnProximo.TextOffset = new System.Drawing.Point(5, 0);
            this.btnProximo.Click += new System.EventHandler(this.btnProximo_Click_1);
            // 
            // btnNovo
            // 
            this.btnNovo.Animated = true;
            this.btnNovo.BorderColor = System.Drawing.Color.Aqua;
            this.btnNovo.BorderRadius = 8;
            this.btnNovo.BorderThickness = 1;
            this.btnNovo.DisabledState.BorderColor = System.Drawing.Color.DarkGray;
            this.btnNovo.DisabledState.CustomBorderColor = System.Drawing.Color.DarkGray;
            this.btnNovo.DisabledState.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(169)))), ((int)(((byte)(169)))), ((int)(((byte)(169)))));
            this.btnNovo.DisabledState.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(141)))), ((int)(((byte)(141)))), ((int)(((byte)(141)))));
            this.btnNovo.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.btnNovo.Font = new System.Drawing.Font("Segoe UI", 12.75F, System.Drawing.FontStyle.Bold);
            this.btnNovo.ForeColor = System.Drawing.Color.White;
            this.btnNovo.Image = ((System.Drawing.Image)(resources.GetObject("btnNovo.Image")));
            this.btnNovo.ImageSize = new System.Drawing.Size(38, 38);
            this.btnNovo.Location = new System.Drawing.Point(505, 5);
            this.btnNovo.Name = "btnNovo";
            this.btnNovo.Size = new System.Drawing.Size(122, 45);
            this.btnNovo.TabIndex = 65;
            this.btnNovo.Text = "Novo";
            this.btnNovo.Click += new System.EventHandler(this.btnNovo_Click_2);
            // 
            // btnAnterior
            // 
            this.btnAnterior.Animated = true;
            this.btnAnterior.BorderColor = System.Drawing.Color.Aqua;
            this.btnAnterior.BorderRadius = 8;
            this.btnAnterior.BorderThickness = 1;
            this.btnAnterior.DisabledState.BorderColor = System.Drawing.Color.DarkGray;
            this.btnAnterior.DisabledState.CustomBorderColor = System.Drawing.Color.DarkGray;
            this.btnAnterior.DisabledState.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(169)))), ((int)(((byte)(169)))), ((int)(((byte)(169)))));
            this.btnAnterior.DisabledState.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(141)))), ((int)(((byte)(141)))), ((int)(((byte)(141)))));
            this.btnAnterior.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.btnAnterior.Font = new System.Drawing.Font("Segoe UI", 12.75F, System.Drawing.FontStyle.Bold);
            this.btnAnterior.ForeColor = System.Drawing.Color.White;
            this.btnAnterior.Image = ((System.Drawing.Image)(resources.GetObject("btnAnterior.Image")));
            this.btnAnterior.ImageAlign = System.Windows.Forms.HorizontalAlignment.Left;
            this.btnAnterior.ImageSize = new System.Drawing.Size(35, 35);
            this.btnAnterior.Location = new System.Drawing.Point(130, 5);
            this.btnAnterior.Name = "btnAnterior";
            this.btnAnterior.Size = new System.Drawing.Size(122, 45);
            this.btnAnterior.TabIndex = 62;
            this.btnAnterior.Text = "Anterior";
            this.btnAnterior.TextAlign = System.Windows.Forms.HorizontalAlignment.Right;
            this.btnAnterior.TextOffset = new System.Drawing.Point(5, 0);
            this.btnAnterior.Click += new System.EventHandler(this.btnAnterior_Click_2);
            // 
            // btnUltimo
            // 
            this.btnUltimo.Animated = true;
            this.btnUltimo.BorderColor = System.Drawing.Color.Aqua;
            this.btnUltimo.BorderRadius = 8;
            this.btnUltimo.BorderThickness = 1;
            this.btnUltimo.DisabledState.BorderColor = System.Drawing.Color.DarkGray;
            this.btnUltimo.DisabledState.CustomBorderColor = System.Drawing.Color.DarkGray;
            this.btnUltimo.DisabledState.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(169)))), ((int)(((byte)(169)))), ((int)(((byte)(169)))));
            this.btnUltimo.DisabledState.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(141)))), ((int)(((byte)(141)))), ((int)(((byte)(141)))));
            this.btnUltimo.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.btnUltimo.Font = new System.Drawing.Font("Segoe UI", 12.75F, System.Drawing.FontStyle.Bold);
            this.btnUltimo.ForeColor = System.Drawing.Color.White;
            this.btnUltimo.Image = ((System.Drawing.Image)(resources.GetObject("btnUltimo.Image")));
            this.btnUltimo.ImageSize = new System.Drawing.Size(35, 35);
            this.btnUltimo.Location = new System.Drawing.Point(380, 5);
            this.btnUltimo.Name = "btnUltimo";
            this.btnUltimo.Size = new System.Drawing.Size(122, 45);
            this.btnUltimo.TabIndex = 64;
            this.btnUltimo.Text = "Ultimo";
            this.btnUltimo.TextOffset = new System.Drawing.Point(2, 0);
            this.btnUltimo.Click += new System.EventHandler(this.btnUltimo_Click_2);
            // 
            // guna2GroupBox2
            // 
            this.guna2GroupBox2.BorderColor = System.Drawing.Color.Aqua;
            this.guna2GroupBox2.BorderRadius = 8;
            this.guna2GroupBox2.Controls.Add(this.ckAdministrador);
            this.guna2GroupBox2.Controls.Add(this.ckBasico);
            this.guna2GroupBox2.CustomBorderThickness = new System.Windows.Forms.Padding(0);
            this.guna2GroupBox2.FillColor = System.Drawing.Color.Transparent;
            this.guna2GroupBox2.Font = new System.Drawing.Font("Segoe UI", 9F);
            this.guna2GroupBox2.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(125)))), ((int)(((byte)(137)))), ((int)(((byte)(149)))));
            this.guna2GroupBox2.Location = new System.Drawing.Point(739, 105);
            this.guna2GroupBox2.Name = "guna2GroupBox2";
            this.guna2GroupBox2.Size = new System.Drawing.Size(158, 71);
            this.guna2GroupBox2.TabIndex = 63;
            this.guna2GroupBox2.TextOffset = new System.Drawing.Point(0, -8);
            // 
            // ckAdministrador
            // 
            this.ckAdministrador.AutoSize = true;
            this.ckAdministrador.CheckedState.BorderColor = System.Drawing.Color.Aqua;
            this.ckAdministrador.CheckedState.BorderRadius = 1;
            this.ckAdministrador.CheckedState.BorderThickness = 1;
            this.ckAdministrador.CheckedState.FillColor = System.Drawing.Color.Transparent;
            this.ckAdministrador.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Bold);
            this.ckAdministrador.ForeColor = System.Drawing.Color.White;
            this.ckAdministrador.Location = new System.Drawing.Point(28, 38);
            this.ckAdministrador.Name = "ckAdministrador";
            this.ckAdministrador.Size = new System.Drawing.Size(115, 20);
            this.ckAdministrador.TabIndex = 1;
            this.ckAdministrador.Text = "Administrador";
            this.ckAdministrador.UncheckedState.BorderColor = System.Drawing.Color.Aqua;
            this.ckAdministrador.UncheckedState.BorderRadius = 1;
            this.ckAdministrador.UncheckedState.BorderThickness = 1;
            this.ckAdministrador.UncheckedState.FillColor = System.Drawing.Color.Transparent;
            this.ckAdministrador.CheckedChanged += new System.EventHandler(this.ckAdministrador_CheckedChanged);
            this.ckAdministrador.Click += new System.EventHandler(this.ckAdministrador_Click_3);
            // 
            // ckBasico
            // 
            this.ckBasico.AutoSize = true;
            this.ckBasico.CheckedState.BorderColor = System.Drawing.Color.Aqua;
            this.ckBasico.CheckedState.BorderRadius = 1;
            this.ckBasico.CheckedState.BorderThickness = 1;
            this.ckBasico.CheckedState.FillColor = System.Drawing.Color.Aqua;
            this.ckBasico.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Bold);
            this.ckBasico.ForeColor = System.Drawing.Color.White;
            this.ckBasico.Location = new System.Drawing.Point(28, 15);
            this.ckBasico.Name = "ckBasico";
            this.ckBasico.Size = new System.Drawing.Size(68, 20);
            this.ckBasico.TabIndex = 0;
            this.ckBasico.Text = "Basico";
            this.ckBasico.UncheckedState.BorderColor = System.Drawing.Color.Aqua;
            this.ckBasico.UncheckedState.BorderRadius = 1;
            this.ckBasico.UncheckedState.BorderThickness = 1;
            this.ckBasico.UncheckedState.FillColor = System.Drawing.Color.Transparent;
            this.ckBasico.CheckedChanged += new System.EventHandler(this.ckBasico_CheckedChanged_1);
            this.ckBasico.Click += new System.EventHandler(this.ckBasico_Click_2);
            // 
            // gpDado
            // 
            this.gpDado.BorderColor = System.Drawing.Color.Aqua;
            this.gpDado.BorderRadius = 8;
            this.gpDado.Controls.Add(this.label5);
            this.gpDado.Controls.Add(this.label1);
            this.gpDado.Controls.Add(this.DomAtivo);
            this.gpDado.Controls.Add(this.label3);
            this.gpDado.Controls.Add(this.TxtLogin);
            this.gpDado.Controls.Add(this.NomUsuario);
            this.gpDado.CustomBorderThickness = new System.Windows.Forms.Padding(0);
            this.gpDado.FillColor = System.Drawing.Color.Transparent;
            this.gpDado.Font = new System.Drawing.Font("Segoe UI", 9F);
            this.gpDado.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(125)))), ((int)(((byte)(137)))), ((int)(((byte)(149)))));
            this.gpDado.Location = new System.Drawing.Point(15, 105);
            this.gpDado.Name = "gpDado";
            this.gpDado.Size = new System.Drawing.Size(704, 71);
            this.gpDado.TabIndex = 64;
            this.gpDado.TextOffset = new System.Drawing.Point(0, -8);
            this.gpDado.Click += new System.EventHandler(this.gbDado_Click);
            // 
            // DomAtivo
            // 
            this.DomAtivo.BorderColor = System.Drawing.Color.Aqua;
            this.DomAtivo.BorderRadius = 8;
            this.DomAtivo.Cursor = System.Windows.Forms.Cursors.IBeam;
            this.DomAtivo.DefaultText = "";
            this.DomAtivo.DisabledState.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(208)))), ((int)(((byte)(208)))), ((int)(((byte)(208)))));
            this.DomAtivo.DisabledState.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(226)))), ((int)(((byte)(226)))), ((int)(((byte)(226)))));
            this.DomAtivo.DisabledState.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(138)))), ((int)(((byte)(138)))), ((int)(((byte)(138)))));
            this.DomAtivo.DisabledState.PlaceholderForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(138)))), ((int)(((byte)(138)))), ((int)(((byte)(138)))));
            this.DomAtivo.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.DomAtivo.FocusedState.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(94)))), ((int)(((byte)(148)))), ((int)(((byte)(255)))));
            this.DomAtivo.Font = new System.Drawing.Font("Segoe UI", 9.75F);
            this.DomAtivo.ForeColor = System.Drawing.Color.White;
            this.DomAtivo.HoverState.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(94)))), ((int)(((byte)(148)))), ((int)(((byte)(255)))));
            this.DomAtivo.Location = new System.Drawing.Point(576, 20);
            this.DomAtivo.Name = "DomAtivo";
            this.DomAtivo.PasswordChar = '\0';
            this.DomAtivo.PlaceholderForeColor = System.Drawing.Color.White;
            this.DomAtivo.PlaceholderText = "";
            this.DomAtivo.SelectedText = "";
            this.DomAtivo.Size = new System.Drawing.Size(120, 32);
            this.DomAtivo.TabIndex = 2;
            this.DomAtivo.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.DomAtivo_KeyPress_1);
            this.DomAtivo.KeyUp += new System.Windows.Forms.KeyEventHandler(this.DomAtivo_KeyUp_1);
            // 
            // TxtLogin
            // 
            this.TxtLogin.BorderColor = System.Drawing.Color.Aqua;
            this.TxtLogin.BorderRadius = 8;
            this.TxtLogin.Cursor = System.Windows.Forms.Cursors.IBeam;
            this.TxtLogin.DefaultText = "";
            this.TxtLogin.DisabledState.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(208)))), ((int)(((byte)(208)))), ((int)(((byte)(208)))));
            this.TxtLogin.DisabledState.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(226)))), ((int)(((byte)(226)))), ((int)(((byte)(226)))));
            this.TxtLogin.DisabledState.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(138)))), ((int)(((byte)(138)))), ((int)(((byte)(138)))));
            this.TxtLogin.DisabledState.PlaceholderForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(138)))), ((int)(((byte)(138)))), ((int)(((byte)(138)))));
            this.TxtLogin.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.TxtLogin.FocusedState.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(94)))), ((int)(((byte)(148)))), ((int)(((byte)(255)))));
            this.TxtLogin.Font = new System.Drawing.Font("Segoe UI", 9.75F);
            this.TxtLogin.ForeColor = System.Drawing.Color.White;
            this.TxtLogin.HoverState.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(94)))), ((int)(((byte)(148)))), ((int)(((byte)(255)))));
            this.TxtLogin.Location = new System.Drawing.Point(296, 20);
            this.TxtLogin.Name = "TxtLogin";
            this.TxtLogin.PasswordChar = '\0';
            this.TxtLogin.PlaceholderForeColor = System.Drawing.Color.White;
            this.TxtLogin.PlaceholderText = "";
            this.TxtLogin.SelectedText = "";
            this.TxtLogin.Size = new System.Drawing.Size(274, 32);
            this.TxtLogin.TabIndex = 3;
            this.TxtLogin.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.TxtLogin_KeyPress_1);
            this.TxtLogin.KeyUp += new System.Windows.Forms.KeyEventHandler(this.TxtLogin_KeyUp_1);
            // 
            // guna2GroupBox3
            // 
            this.guna2GroupBox3.BorderColor = System.Drawing.Color.Aqua;
            this.guna2GroupBox3.BorderRadius = 8;
            this.guna2GroupBox3.Controls.Add(this.dtgDados);
            this.guna2GroupBox3.Controls.Add(this.DomGrupo);
            this.guna2GroupBox3.Controls.Add(this.lblId);
            this.guna2GroupBox3.CustomBorderThickness = new System.Windows.Forms.Padding(0);
            this.guna2GroupBox3.FillColor = System.Drawing.Color.Transparent;
            this.guna2GroupBox3.Font = new System.Drawing.Font("Segoe UI", 9F);
            this.guna2GroupBox3.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(125)))), ((int)(((byte)(137)))), ((int)(((byte)(149)))));
            this.guna2GroupBox3.Location = new System.Drawing.Point(11, 205);
            this.guna2GroupBox3.Name = "guna2GroupBox3";
            this.guna2GroupBox3.Size = new System.Drawing.Size(885, 331);
            this.guna2GroupBox3.TabIndex = 65;
            this.guna2GroupBox3.TextOffset = new System.Drawing.Point(0, -8);
            // 
            // guna2ControlBox2
            // 
            this.guna2ControlBox2.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.guna2ControlBox2.BorderColor = System.Drawing.Color.Aqua;
            this.guna2ControlBox2.BorderThickness = 1;
            this.guna2ControlBox2.ControlBoxType = Guna.UI2.WinForms.Enums.ControlBoxType.MinimizeBox;
            this.guna2ControlBox2.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.guna2ControlBox2.IconColor = System.Drawing.Color.White;
            this.guna2ControlBox2.Location = new System.Drawing.Point(839, 5);
            this.guna2ControlBox2.Name = "guna2ControlBox2";
            this.guna2ControlBox2.Size = new System.Drawing.Size(26, 19);
            this.guna2ControlBox2.TabIndex = 67;
            // 
            // guna2ControlBox1
            // 
            this.guna2ControlBox1.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.guna2ControlBox1.BorderColor = System.Drawing.Color.Aqua;
            this.guna2ControlBox1.BorderThickness = 1;
            this.guna2ControlBox1.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.guna2ControlBox1.IconColor = System.Drawing.Color.White;
            this.guna2ControlBox1.Location = new System.Drawing.Point(871, 5);
            this.guna2ControlBox1.Name = "guna2ControlBox1";
            this.guna2ControlBox1.Size = new System.Drawing.Size(26, 19);
            this.guna2ControlBox1.TabIndex = 66;
            // 
            // guna2Elipse1
            // 
            this.guna2Elipse1.BorderRadius = 10;
            this.guna2Elipse1.TargetControl = this;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.ForeColor = System.Drawing.Color.White;
            this.label2.Location = new System.Drawing.Point(740, 98);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(39, 16);
            this.label2.TabIndex = 109;
            this.label2.Text = "Nivel";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label4.ForeColor = System.Drawing.Color.White;
            this.label4.Location = new System.Drawing.Point(14, 96);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(118, 16);
            this.label4.TabIndex = 110;
            this.label4.Text = "Dados de Usuario";
            // 
            // NomUsuario
            // 
            this.NomUsuario.BorderColor = System.Drawing.Color.Aqua;
            this.NomUsuario.BorderRadius = 8;
            this.NomUsuario.Cursor = System.Windows.Forms.Cursors.IBeam;
            this.NomUsuario.DefaultText = "";
            this.NomUsuario.DisabledState.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(208)))), ((int)(((byte)(208)))), ((int)(((byte)(208)))));
            this.NomUsuario.DisabledState.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(226)))), ((int)(((byte)(226)))), ((int)(((byte)(226)))));
            this.NomUsuario.DisabledState.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(138)))), ((int)(((byte)(138)))), ((int)(((byte)(138)))));
            this.NomUsuario.DisabledState.PlaceholderForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(138)))), ((int)(((byte)(138)))), ((int)(((byte)(138)))));
            this.NomUsuario.FillColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.NomUsuario.FocusedState.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(94)))), ((int)(((byte)(148)))), ((int)(((byte)(255)))));
            this.NomUsuario.Font = new System.Drawing.Font("Segoe UI", 9.75F);
            this.NomUsuario.ForeColor = System.Drawing.Color.White;
            this.NomUsuario.HoverState.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(94)))), ((int)(((byte)(148)))), ((int)(((byte)(255)))));
            this.NomUsuario.Location = new System.Drawing.Point(6, 20);
            this.NomUsuario.Name = "NomUsuario";
            this.NomUsuario.PasswordChar = '\0';
            this.NomUsuario.PlaceholderForeColor = System.Drawing.Color.Silver;
            this.NomUsuario.PlaceholderText = "";
            this.NomUsuario.SelectedText = "";
            this.NomUsuario.Size = new System.Drawing.Size(287, 32);
            this.NomUsuario.TabIndex = 110;
            // 
            // FrmCadUsuarios
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(9)))), ((int)(((byte)(43)))));
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(912, 548);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.guna2ControlBox2);
            this.Controls.Add(this.guna2ControlBox1);
            this.Controls.Add(this.guna2GroupBox3);
            this.Controls.Add(this.gpDado);
            this.Controls.Add(this.guna2GroupBox2);
            this.Controls.Add(this.guna2GroupBox1);
            this.Controls.Add(this.lblStatus);
            this.Font = new System.Drawing.Font("Calibri", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ForeColor = System.Drawing.Color.White;
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MaximizeBox = false;
            this.Name = "FrmCadUsuarios";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Cadastro de Usuários";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.FrmComerciais_FormClosing);
            this.Load += new System.EventHandler(this.FrmComerciais_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dtgDados)).EndInit();
            this.guna2GroupBox1.ResumeLayout(false);
            this.guna2GroupBox2.ResumeLayout(false);
            this.guna2GroupBox2.PerformLayout();
            this.gpDado.ResumeLayout(false);
            this.gpDado.PerformLayout();
            this.guna2GroupBox3.ResumeLayout(false);
            this.guna2GroupBox3.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label lblStatus;
        private System.Windows.Forms.DataGridView dtgDados;
        public System.Windows.Forms.Label lblId;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label DomGrupo;
        private Guna.UI2.WinForms.Guna2GroupBox guna2GroupBox1;
        private Guna.UI2.WinForms.Guna2Button btnDel;
        private Guna.UI2.WinForms.Guna2Button btnPrimeiro;
        private Guna.UI2.WinForms.Guna2Button btnSalva;
        private Guna.UI2.WinForms.Guna2Button btnProximo;
        private Guna.UI2.WinForms.Guna2Button btnNovo;
        private Guna.UI2.WinForms.Guna2Button btnAnterior;
        private Guna.UI2.WinForms.Guna2Button btnUltimo;
        private Guna.UI2.WinForms.Guna2GroupBox guna2GroupBox2;
        private Guna.UI2.WinForms.Guna2CheckBox ckAdministrador;
        private Guna.UI2.WinForms.Guna2CheckBox ckBasico;
        private Guna.UI2.WinForms.Guna2GroupBox gpDado;
        private Guna.UI2.WinForms.Guna2TextBox DomAtivo;
        private Guna.UI2.WinForms.Guna2TextBox TxtLogin;
        private Guna.UI2.WinForms.Guna2GroupBox guna2GroupBox3;
        private Guna.UI2.WinForms.Guna2ControlBox guna2ControlBox2;
        private Guna.UI2.WinForms.Guna2ControlBox guna2ControlBox1;
        private Guna.UI2.WinForms.Guna2Elipse guna2Elipse1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label4;
        private Guna.UI2.WinForms.Guna2TextBox NomUsuario;
    }
}

