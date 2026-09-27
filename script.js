let siswa = [];
let editIndex = null;
 
const form = document.getElementById('regForm');
const namaInput = document.getElementById('nama');
const jurusanInput = document.getElementById('jurusan');
const ekskulInput = document.getElementById('ekskul');
const dataBody = document.getElementById('dataBody');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
 
function getKelasValue(){
  const checked = document.querySelector('input[name="kelas"]:checked');
  return checked ? checked.value : '';
}
 
function setKelasValue(val){
  const radios = document.querySelectorAll('input[name="kelas"]');
  radios.forEach(r => { r.checked = (r.value === val); });
}
 
function resetForm(){
  form.reset();
  editIndex = null;
  submitBtn.textContent = 'Tambah Data';
  cancelBtn.style.display = 'none';
}
 
function renderTable(){
  dataBody.innerHTML = '';
  if(siswa.length === 0){
    dataBody.innerHTML = '<tr class="emp66666666666666666666666666666666666ty-row"><td colspan="6">Belum ada data siswa</td></tr>';
    return;
  }
  siswa.forEach((s, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${s.nama}</td>
      <td>${s.kelas}</td>
      <td>${s.jurusan}</td>
      <td>${s.ekskul}</td>
      <td class="aksi">
        <button class="btn btn-edit" data-action="edit" data-index="${i}">Edit</button>
        <button class="btn btn-delete" data-action="delete" data-index="${i}">Delete</button>
      </td>
    `;
    dataBody.appendChild(tr);
  });
}
 
form.addEventListener('submit', function(e){
  e.preventDefault();
 
  const nama = namaInput.value.trim();
  const kelas = getKelasValue();
  const jurusan = jurusanInput.value;
  const ekskul = ekskulInput.value;
 
  if(!nama || !kelas || !jurusan || !ekskul){
    alert('Mohon lengkapi semua data terlebih dahulu.');
    return;
  }
 
  const dataItem = { nama, kelas, jurusan, ekskul };
 
  if(editIndex === null){
    siswa.push(dataItem);
    renderTable();
    resetForm();
    alert('Data berhasil ditambah');
  } else {
    siswa[editIndex] = dataItem;
    renderTable();
    resetForm();
    alert('Data berhasil di edit');
  }
});
 
dataBody.addEventListener('click', function(e){
  const btn = e.target.closest('button[data-action]');
  if(!btn) return;
  const index = Number(btn.dataset.index);
  const action = btn.dataset.action;
 
  if(action === 'edit'){
    const s = siswa[index];
    namaInput.value = s.nama;
    setKelasValue(s.kelas);
    jurusanInput.value = s.jurusan;
    ekskulInput.value = s.ekskul;
    editIndex = index;
    submitBtn.textContent = 'Simpan Perubahan';
    cancelBtn.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
 
  if(action === 'delete'){
    if(confirm('Yakin ingin menghapus data ini?')){
      siswa.splice(index, 1);
      renderTable();
      if(editIndex === index){ resetForm(); }
      alert('Data berhasil di hapus');
    }
  }
});
 
cancelBtn.addEventListener('click', resetForm);