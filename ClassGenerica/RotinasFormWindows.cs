using System;
using System.Data;
using System.Windows.Forms;
using System.Drawing;
using Guna.UI2.WinForms;

namespace ClassGenerica
{
    public class RotinasFormWindows
    {

        private string _sError;

        public string SError
        {
            get { return _sError; }
        }

        public void pintaGrid(ref DataGridView DGrid, string sRef, int iCol, Color cor)
        {
            for (int i = 0; i < DGrid.RowCount; i++)
            {
                if (DGrid.Rows[i].Cells[iCol].Value.ToString() == sRef)
                    DGrid.Rows[i].DefaultCellStyle.BackColor = cor;
            }

        }

        void pintaGrid(ref DataGridView DGrid, int iRow, Color cor)
        {
            DGrid.Rows[iRow].DefaultCellStyle.BackColor = cor;
        }

        //private string sResult = "";


        //!Função: Rotina que Popula ComboBox
        //!@param DisplayMember: Coluna que vai no Display
        //!@param ValueMember: Coluna que vai no Value
        //!@param dts : DataSet dos Dados
        //!@param cbo: ref Objeto (Combo,list)
        //!@return void: Void
        /// <summary>
        /// Rotina que Popula ComboBox
        /// </summary>
        /// <param name="DisplayMember">Coluna que vai no Display</param>
        /// <param name="ValueMember">Coluna que vai no Value</param>
        /// <param name="ds">DataSet dos Dados</param>
        /// <param name="cbo">ref Objeto (Combo,list)</param>
        public void _PopulaCombo(string DisplayMember, string ValueMember, DataSet dts, ref ComboBox cbo)
        {
            try
            {
                cbo.DisplayMember = DisplayMember;
                cbo.ValueMember = ValueMember;
                cbo.DataSource = dts.Tables[0];
            }
            catch (Exception e)
            { _sError = e.ToString(); }
        }



        //!Função: Rotina que Popula ListBox
        //!@param DisplayMember: Coluna que vai no Display
        //!@param ValueMember: Coluna que vai no Value
        //!@param dts: DataSet dos Dados
        //!@param cbo: ref Objeto (Combo,list)
        //!@return void: Void
        /// <summary>
        /// Rotina que Popula ListBox
        /// </summary>
        /// <param name="DisplayMember">Coluna que vai no Display</param>
        /// <param name="ValueMember">Coluna que vai no Value</param>
        /// <param name="ds">DataSet dos Dados</param>
        /// <param name="cbo">ref Objeto (Combo,list)</param>
        public void _PopulaList(string DisplayMember, string ValueMember, DataSet dts, ref ListBox cbo)
        {
            try
            {
                cbo.DisplayMember = DisplayMember;
                cbo.ValueMember = ValueMember;
                cbo.DataSource = dts.Tables[0];
            }
            catch (Exception e)
            { _sError = e.ToString(); }
        }


        //!Função: Seta o Estado do Objeto
        //!@param objCampo: Ref Objeto
        //!@param estado: Mensagem de Erro
        //!@return void: Void
        /// <summary>
        /// Seta o Estado do Objeto
        /// </summary>
        /// <param name="objCampo">Objeto</param>
        /// <param name="estado">Estado do Objeto</param>
        public void setListaControls(ref ToolStripButton objCampo, bool estado)
        {
            try
            {
                if (!estado)
                    objCampo.Enabled = false;
                else
                    objCampo.Enabled = true;
            }
            catch (Exception e)
            { _sError = e.ToString(); }
        }


        //!Função: Seta o Estado do Objeto
        //!@param objCampo: Ref Objeto
        //!@param estado: Mensagem de Erro
        //!@param Limpa: Estado do Objeto
        //!@return void: Void
        /// <summary>
        /// Seta o Estado do Objeto
        /// </summary>
        /// <param name="objCampo">Objeto</param>
        /// <param name="estado">Estado do Objeto</param>
        /// <param name="Limpa">Limpa Objeto</param>
        public void setListaControls(ref TextBox objCampo, bool estado, bool Limpa)
        {
            try
            {
                if (!estado)
                    objCampo.ReadOnly = true;
                else
                    objCampo.ReadOnly = false;

                if (Limpa)
                    objCampo.Text = "";

            }
            catch (Exception e)
            { _sError = e.ToString(); }
        }


        //!Função: Seta o Estado do Objeto
        //!@param objCampo: Ref Objeto
        //!@param estado: Mensagem de Erro
        //!@return void: Void
        /// <summary>
        /// Seta o Estado do Objeto
        /// </summary>
        /// <param name="objCampo">Objeto</param>
        /// <param name="estado">Estado do Objeto</param>
        /// <param name="Limpa">Limpa Objeto</param>
        public void setListaControls(ref DataGridView objCampo, bool estado)
        {
            try
            {
                if (!estado)
                    objCampo.Enabled = false;
                else
                    objCampo.Enabled = true;
            }
            catch (Exception e)
            { _sError = e.ToString(); }
        }


        //!Função: Seta o Estado do Objeto
        //!@param objCampo: Ref Objeto
        //!@param estado: Mensagem de Erro
        //!@return void: Void
        /// <summary>
        /// Seta o Estado do Objeto
        /// </summary>
        /// <param name="objCampo">Objeto</param>
        /// <param name="estado">Estado do Objeto</param>
        /// <param name="Limpa">Limpa Objeto</param>
        public void setListaControls(ref ListBox objCampo, bool estado)
        {
            try
            {
                if (!estado)
                    objCampo.Enabled = false;
                else
                    objCampo.Enabled = true;
            }
            catch (Exception e)
            { _sError = e.ToString(); }
        }

        public void MudaCor(Control.ControlCollection Controls, string sNome, Color cor)
        {
            _sError = null;
            try
            {
                foreach (var item in Controls)
                {
                    string sTipo = item.GetType().ToString();
                    if (sTipo.Contains("MaskedTextBox"))
                    {
                        if (((MaskedTextBox)item).Name == sNome)
                            ((MaskedTextBox)item).BackColor = cor;
                    }
                    else

                    if (sTipo.Contains("TextBox"))
                    {
                        if (((TextBox)item).Name == sNome)
                            ((TextBox)item).BackColor = cor;
                    }

                }
            }
            catch (Exception e)
            { _sError = e.ToString(); }

        }


        public void Resetcor(Control.ControlCollection Controls)
        {
            _sError = null;
            try
            {
                foreach (var item in Controls)
                {
                    string sTipo = item.GetType().ToString();
                    if (sTipo.Contains("MaskedTextBox"))
                    {
                        if ((((MaskedTextBox)item).Tag == null) || (((MaskedTextBox)item).Tag.ToString() == ""))
                        {
                            MaskedTextBox obj = ((MaskedTextBox)item);
                            obj.BackColor = Color.White;
                        }
                    }
                    else if (sTipo.Contains("TextBox"))

                    {
                        if ((((Guna2TextBox)item).Tag == null) || (((Guna2TextBox)item).Tag.ToString() == ""))
                        {
                            Guna2TextBox obj = ((Guna2TextBox)item);
                            obj.BackColor = Color.White;
                            obj.ForeColor = Color.White;
                        }
                    }
                    else if (sTipo.Contains("ComboBox"))
                    {
                        if ((((Guna2ComboBox)item).Tag == null) || (((Guna2ComboBox)item).Tag.ToString() == ""))
                        {
                            Guna2ComboBox obj = ((Guna2ComboBox)item);
                            obj.BackColor = Color.White;
                            obj.ForeColor = Color.White;
                        }
                    }
                    else if (sTipo.Contains("CheckBox"))
                    {
                        if ((((Guna2CheckBox)item).Tag == null) || (((Guna2CheckBox)item).Tag.ToString() == ""))
                        {
                            Guna2CheckBox obj = ((Guna2CheckBox)item);
                            obj.Checked = false;
                            obj.ForeColor = Color.White;
                        }
                    }

                }
            }
            catch (Exception e)
            {
                _sError = e.ToString();
            }

        }

        public void setListaControls(Control.ControlCollection Controls, ref BindingSource bdsDados)
        {
            _sError = null;
            try
            {
                foreach (var item in Controls)
                {
                    try
                    {
                        string sTipo = item.GetType().ToString();
                        if (sTipo.Contains("MaskedTextBox"))
                        {
                            string sNome = ((MaskedTextBox)item).Name;
                            if ((((MaskedTextBox)item).Tag == null) || (((MaskedTextBox)item).Tag.ToString() == ""))
                            {
                                MaskedTextBox obj = ((MaskedTextBox)item);
                                setLista(ref obj, "Text", ref bdsDados, ((MaskedTextBox)item).Name);
                            }
                        }
                        else
                        {
                            if (sTipo.Contains("TextBox"))
                            {
                                string sNome = ((Guna2TextBox)item).Name;
                                if ((((Guna2TextBox)item).Tag == null) || (((Guna2TextBox)item).Tag.ToString() == ""))
                                {
                                    Guna2TextBox obj = ((Guna2TextBox)item);
                                    setLista(ref obj, "Text", ref bdsDados, ((Guna2TextBox)item).Name);
                                }
                            }
                            else
                            {
                                if ((sTipo.Contains("Label")))
                                {
                                    string sNome = ((Guna2HtmlLabel)item).Name;
                                    if ((((Guna2HtmlLabel)item).Tag != null) && (((Guna2HtmlLabel)item).Tag.ToString() == "0"))
                                    {
                                        Guna2HtmlLabel obj = ((Guna2HtmlLabel)item);
                                        setLista(ref obj, "Text", ref bdsDados, ((Guna2HtmlLabel)item).Name);
                                    }
                                }
                            }
                        }

                    }
                    catch (Exception e)
                    {
                        _sError = e.ToString();
                    }
                }
            }
            catch (Exception e)
            {
                _sError = e.ToString();
            }

        }

        //!Função: Seta o Estado do Objeto
        //!@param objCampo: Ref Objeto
        //!@param estado: Mensagem de Erro
        //!@param Limpa: Estado do Objeto
        //!@return void: Void
        /// <summary>
        /// Seta o Estado do Objeto
        /// </summary>
        /// <param name="objCampo">Objeto</param>
        /// <param name="estado">Estado do Objeto</param>
        /// <param name="Limpa">Limpa Objeto</param>
        public void setListaControls(ref ComboBox objCampo, bool estado, bool Limpa)
        {
            try
            {
                if (!estado)
                    objCampo.Enabled = false;
                else
                    objCampo.Enabled = true;

                if (Limpa)
                    objCampo.SelectedIndex = -1;
            }
            catch (Exception e)
            { _sError = e.ToString(); }
        }


        //!Função: Seta o Estado do Objeto
        //!@param objCampo: Ref Objeto
        //!@param estado: Mensagem de Erro
        //!@return void: Void
        /// <summary>
        /// Seta o Estado do Objeto
        /// </summary>
        /// <param name="objCampo">Objeto</param>
        /// <param name="estado">Estado do Objeto</param>
        /// <param name="Limpa">Limpa Objeto</param>
        public void setListaControls(ref Button objCampo, bool estado)
        {
            try
            {
                if (!estado)
                    objCampo.Enabled = false;
                else
                    objCampo.Enabled = true;
            }
            catch (Exception e)
            { _sError = e.ToString(); }
        }


        //!Função: Seta o Estado do Objeto
        //!@param objCampo: Ref Objeto
        //!@param estado: Mensagem de Erro
        //!@return void: Void
        /// <summary>
        /// Seta o Estado do Objeto
        /// </summary>
        /// <param name="objCampo">Objeto</param>
        /// <param name="estado">Estado do Objeto</param>
        /// <param name="Limpa">Limpa Objeto</param>
        public void setListaControls(ref DateTimePicker objCampo, bool estado)
        {
            try
            {
                if (!estado)
                    objCampo.Enabled = false;
                else
                    objCampo.Enabled = true;
            }
            catch (Exception e)
            { _sError = e.ToString(); }
        }



        //!Função: Rotina que resgata Data no Servidor formato Log
        //!@return string: Data no formato Log
        /// <summary>
        /// Rotina que resgata Data no Servidor formato Log
        /// </summary>
        /// <returns>Data no formato Log</returns>
        public string AjusteDataExtenso()
        {
            string sResult = "";
            try
            {
                //Ajustando a data por extenso.
                DateTime d = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
                char[] arr = d.ToLongDateString().ToCharArray();
                //Deixando a primeira letra maiúscula
                arr[0] = Convert.ToChar(arr[0].ToString().ToUpper());
                sResult = new String(arr);
                return sResult;
            }
            catch (Exception e)
            { return sResult = e.ToString(); }
        }


        //!Função: Rotina que cria Grid
        //!@param DGridV: Ref Grid
        //!@param Titulo: Nome da coluna na Grid
        //!@param Field: Nome da coluna no Banco
        //!@param Tamanho: Tamanho da coluna na Grid
        //!@return string: string de Error
        /// <summary>
        /// Rotina que cria Grid
        /// </summary>
        /// <param name="DGridV">ref Grid</param>
        /// <param name="Titulo">Nome da coluna na Grid</param>
        /// <param name="Field">Nome da coluna no Banco</param>
        /// <param name="Tamanho">Tamanho da coluna na Grid</param>
        /// <returns>string de Error</returns>
        public string CriaGrid(ref DataGridView DGridV, string Titulo, string Field, int Tamanho)
        {
            string sResult = "";
            try
            {
                DataGridViewTextBoxColumn coluna = new DataGridViewTextBoxColumn();

                DGridV.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] { coluna });

                coluna.DataPropertyName = Field;
                coluna.HeaderText = Titulo;
                coluna.ReadOnly = true;
                coluna.Width = Tamanho;
                coluna.Name = Field;
            }
            catch (Exception e)
            {
                sResult = e.ToString();
            }

            return sResult;
        }

        //!Função: Rotina que seta Componente no BindingSource
        //!@param objCampo: ref Objeto
        //!@param Tipo: Tipo Objeto exe. "Text"
        //!@param bds: ref BindingSource
        //!@param Field: Nome do Campo no Banco
        //!@return string: string de Error
        /// <summary>
        /// Rotina que seta Componente no BindingSource
        /// </summary>
        /// <param name="objCampo">ref Objeto</param>
        /// <param name="Tipo">Tipo Objeto exe. "Text"</param>
        /// <param name="bds">ref BindingSource</param>
        /// <param name="Field">Nome do Campo no Banco</param>
        /// <returns>string de Error</returns>
        public string setLista(ref ComboBox objCampo, string Tipo, ref BindingSource bds, string Field)
        {
            string sResult = "";
            try
            {
                if (objCampo.DataBindings.Count != 0)
                {
                    objCampo.DataBindings.Clear();
                }
                objCampo.DataBindings.Add(new Binding(Tipo, bds, Field));
            }
            catch (Exception e)
            {
                sResult = e.ToString();
                if (sResult.Contains("column"))
                    sResult = "Não Existe Coluna na Busca !";
            }

            return sResult;
        }

        public ComboBox setLista(ref Guna2ComboBox objCampo, string Tipo, ref BindingSource bds, string Field)
        {
            string sResult = "";
            try
            {
                if (objCampo.DataBindings.Count != 0)
                {
                    objCampo.DataBindings.Clear();
                }
                objCampo.DataBindings.Add(new Binding(Tipo, bds, Field));
            }
            catch (Exception e)
            {
                sResult = e.ToString();
                if (sResult.Contains("column"))
                    sResult = "Não Existe Coluna na Busca !";
            }

            return objCampo;
        }
        //!Função: Rotina que seta Componente no BindingSource
        //!@param objCampo: ref Objeto
        //!@param Tipo: Tipo Objeto exe. "Text"
        //!@param bds: ref BindingSource
        //!@param Field: Nome do Campo no Banco
        //!@return string : string de Error
        /// <summary>
        /// Rotina que seta Componente no BindingSource
        /// </summary>
        /// <param name="objCampo">ref Objeto</param>
        /// <param name="Tipo">Tipo Objeto exe. "Text"</param>
        /// <param name="bds">ref BindingSource</param>
        /// <param name="Field">Nome do Campo no Banco</param>+     
        /// <returns>string de Error</returns>
        public string setLista(ref Guna2TextBox objCampo, string Tipo, ref BindingSource bds, string Field)
        {
            string sResult = "";
            try
            {
                if (objCampo.DataBindings.Count != 0)
                {
                    objCampo.DataBindings.Clear();
                }

                objCampo.DataBindings.Add(new Binding(Tipo, bds, Field));
            }
            catch (Exception e)
            {
                sResult = e.ToString();
                if (sResult.Contains("column"))
                    sResult = "Não Existe Coluna na Busca !";
                MessageBox.Show("Falha: " + Field + "\r\n" + e.Message);
            }

            return sResult;
        }
        public string setLista(ref TextBox objCampo, string Tipo, ref BindingSource bds, string Field)
        {
            string sResult = "";
            try
            {
                if (objCampo.DataBindings.Count != 0)
                {
                    objCampo.DataBindings.Clear();
                }

                objCampo.DataBindings.Add(new Binding(Tipo, bds, Field));
            }
            catch (Exception e)
            {
                sResult = e.ToString();
                if (sResult.Contains("column"))
                    sResult = "Não Existe Coluna na Busca !";
                MessageBox.Show("Falha: " + Field + "\r\n" + e.Message);
            }

            return sResult;
        }
        //!Função: Rotina que seta Componente no BindingSource
        //!@param objCampo: ref Objeto
        //!@param Tipo: Tipo Objeto exe. "Text"
        //!@param bds: ref BindingSource
        //!@param Field: Nome do Campo no Banco
        //!@return string : string de Error
        /// <summary>
        /// Rotina que seta Componente no BindingSource
        /// </summary>
        /// <param name="objCampo">ref Objeto</param>
        /// <param name="Tipo">Tipo Objeto exe. "Text"</param>
        /// <param name="bds">ref BindingSource</param>
        /// <param name="Field">Nome do Campo no Banco</param>
        /// <returns>string de Error</returns>
        public string setLista(ref MaskedTextBox objCampo, string Tipo, ref BindingSource bds, string Field)
        {
            string sResult = "";
            try
            {
                if (objCampo.DataBindings.Count != 0)
                {
                    objCampo.DataBindings.Clear();
                }

                objCampo.DataBindings.Add(new Binding(Tipo, bds, Field));
            }
            catch (Exception e)
            {
                sResult = e.ToString();
                if (sResult.Contains("column"))
                    sResult = "Não Existe Coluna na Busca !";
            }

            return sResult;
        }
        //!Função: Rotina que seta Componente no BindingSource
        //!@param objCampo: ref Objeto
        //!@param Tipo: Tipo Objeto exe. "Text"
        //!@param bds: ref BindingSource
        //!@param Field: Nome do Campo no Banco
        //!@return string: string de Error
        /// <summary>
        /// Rotina que seta Componente no BindingSource
        /// </summary>
        /// <param name="objCampo">ref Objeto</param>
        /// <param name="Tipo">Tipo Objeto exe. "Text"</param>
        /// <param name="bds">ref BindingSource</param>
        /// <param name="Field">Nome do Campo no Banco</param>
        /// <returns>string de Error</returns>
        public string setLista(ref DateTimePicker objCampo, string Tipo, ref BindingSource bds, string Field)
        {
            string sResult = "";
            try
            {
                if (objCampo.DataBindings.Count != 0)
                {
                    objCampo.DataBindings.Clear();
                }

                objCampo.DataBindings.Add(new Binding(Tipo, bds, Field));
            }
            catch (Exception e)
            {
                sResult = e.ToString();
                if (sResult.Contains("column"))
                    sResult = "Não Existe Coluna na Busca !";
            }

            return sResult;
        }
        //!Função: Rotina que seta Componente no BindingSource
        //!@param objCampo: ref Objeto
        //!@param Tipo: Tipo Objeto exe. "Text"
        //!@param bds: ref BindingSource
        //!@param Field: Nome do Campo no Banco
        //!@return string: string de Error
        /// <summary>
        /// Rotina que seta Componente no BindingSource
        /// </summary>
        /// <param name="objCampo">ref Objeto</param>
        /// <param name="Tipo">Tipo Objeto exe. "Text"</param>
        /// <param name="bds">ref BindingSource</param>
        /// <param name="Field">Nome do Campo no Banco</param>
        /// <returns>string de Error</returns>
        public string setLista(ref Label objCampo, string Tipo, ref BindingSource bds, string Field)
        {
            string sResult = "";
            try
            {
                if (objCampo.DataBindings.Count != 0)
                {
                    objCampo.DataBindings.Clear();
                }

                objCampo.DataBindings.Add(new Binding(Tipo, bds, Field));
            }
            catch (Exception e)
            {
                sResult = e.Message.ToString();
                if (sResult.Contains("column"))
                    sResult = "Não Existe Coluna na Busca !";
            }

            return sResult;
        }
        public string setLista(ref Guna2HtmlLabel objCampo, string Tipo, ref BindingSource bds, string Field)
        {
            string sResult = "";
            try
            {
                if (objCampo.DataBindings.Count != 0)
                {
                    objCampo.DataBindings.Clear();
                }

                objCampo.DataBindings.Add(new Binding(Tipo, bds, Field));
            }
            catch (Exception e)
            {
                sResult = e.Message.ToString();
                if (sResult.Contains("column"))
                    sResult = "Não Existe Coluna na Busca !";
            }

            return sResult;
        }
        //!Função: Rotina que cria Grid
        //!@param DGridV: Ref Grid
        //!@param Titulo: Nome da coluna na Grid
        //!@param Field: Nome da coluna no Banco
        //!@param Tamanho: Tamanho da coluna na Grid
        //!@return string: string de Error
        /// <summary>
        /// Rotina que cria Grid
        /// </summary>
        /// <param name="DGridV">ref Grid</param>
        /// <param name="Titulo">Nome da coluna na Grid</param>
        /// <param name="Field">Nome da coluna no Banco</param>
        /// <param name="Tamanho">Tamanho da coluna na Grid</param>
        /// <returns>string de Error</returns>
        public string CriaGrid(ref DataGridView DGridV, string Titulo, string Field, int Tamanho, string sImagem)
        {
            try
            {
                _sError = null;

                if (sImagem == "btn")
                {
                    DataGridViewButtonColumn coluna = new DataGridViewButtonColumn();
                    DGridV.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] { coluna });
                    coluna.DataPropertyName = Field;
                    coluna.HeaderText = Titulo;
                    coluna.ReadOnly = true;
                    coluna.Width = Tamanho;
                    coluna.Name = Field;
                    coluna.ValueType = typeof(int);
                }
                else
                {
                    DataGridViewImageColumn coluna = new DataGridViewImageColumn();
                    DGridV.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] { coluna });
                    coluna.DataPropertyName = Field;
                    coluna.HeaderText = Titulo;
                    coluna.ReadOnly = true;
                    coluna.Width = Tamanho;
                    coluna.Name = Field;
                    coluna.ValueType = typeof(int);
                }
            }
            catch (Exception e)
            {
                _sError = e.ToString();
                MessageBox.Show("Erro: " + _sError);
            }
            return _sError;
        }
        //!Função: Rotina que cria Grid
        //!@param DGridV: Ref Grid
        //!@param Titulo: Nome da coluna na Grid
        //!@param Field: Nome da coluna no Banco
        //!@param Tamanho: Tamanho da coluna na Grid
        //!@return string: string de Error
        /// <summary>
        /// Rotina que cria Grid
        /// </summary>
        /// <param name="DGridV">ref Grid</param>
        /// <param name="Titulo">Nome da coluna na Grid</param>
        /// <param name="Field">Nome da coluna no Banco</param>
        /// <param name="Tamanho">Tamanho da coluna na Grid</param>
        /// <returns>string de Error</returns>
        public string CriaGrid(ref DataGridView DGridV, string Titulo, string Field, int Tamanho, DataGridViewContentAlignment dgvalin)
        {
            try
            {
                _sError = null;
                DataGridViewTextBoxColumn coluna = new DataGridViewTextBoxColumn();

                DGridV.Columns.AddRange(new DataGridViewColumn[] { coluna });
                DataGridViewCellStyle dataGridViewCellStyle1 = new DataGridViewCellStyle();
                dataGridViewCellStyle1.Alignment = dgvalin; // System.Windows.Forms.DataGridViewContentAlignment.MiddleRight;
                coluna.DefaultCellStyle = dataGridViewCellStyle1;
                coluna.DataPropertyName = Field;
                coluna.HeaderText = Titulo;
                coluna.ReadOnly = true;
                coluna.Width = Tamanho;
                coluna.Name = Field;
            }
            catch (Exception e)
            {
                _sError = e.ToString();
                MessageBox.Show("Erro: " + _sError);
            }

            return _sError;

        }

        public string setLista(ref CheckBox objCampo, string Tipo, ref BindingSource bds, string Field)
        {
            string sResult = "";
            try
            {
                if (objCampo.DataBindings.Count != 0)
                {
                    objCampo.DataBindings.Clear();
                }
                DataTable dataSource = ((DataView)bds.List).Table;
                if (dataSource != null)
                {      
                        objCampo.DataBindings.Add(new Binding(Tipo, bds, Field, true, DataSourceUpdateMode.OnPropertyChanged,
                            dataSource.Rows.Count > 0 && dataSource.Rows[0][Field].ToString() == "1"));
                    
                }
            }
            catch (Exception e)
            {
                sResult = e.ToString();
                if (sResult.Contains("column"))
                    sResult = "Não Existe Coluna na Busca !";
            }

            return sResult;
        }


    }
}

