import os

# 1. DATA MAHASISWA (List of Dictionaries)
database_mahasiswa = [
    {"nama": "Grace", "nim": "115", "nilai_uts": 85, "nilai_uas": 80, "nilai_tugas": 90},
    {"nama": "Arsa", "nim": "108", "nilai_uts": 60, "nilai_uas": 55, "nilai_tugas": 70},
    {"nama": "Memory", "nim": "095", "nilai_uts": 90, "nilai_uas": 95, "nilai_tugas": 92},
    {"nama": "Ezra", "nim": "196", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50},
    {"nama": "Nadya", "nim": "167", "nilai_uts": 75, "nilai_uas": 78, "nilai_tugas": 80}
]

# --- CORE FUNCTIONS ---

def hitung_nilai_akhir(uts, uas, tugas):
    """
    Rumus: 30% UTS + 40% UAS + 30% Tugas
    """
    return (uts * 0.30) + (uas * 0.40) + (tugas * 0.30)

def tentukan_grade(nilai_akhir):
    if nilai_akhir >= 80: return 'A'
    elif nilai_akhir >= 70: return 'B'
    elif nilai_akhir >= 60: return 'C'
    elif nilai_akhir >= 50: return 'D'
    else: return 'E'

def tampilkan_tabel(data=None):
    """
    Menampilkan data dalam format tabel yang rapi.
    Jika parameter 'data' kosong, menggunakan database global.
    """
    target_data = data if data is not None else database_mahasiswa
    
    print(f"\n{'='*75}")
    print(f"{'NAMA':<15} | {'NIM':<10} | {'UTS':<5} | {'UAS':<5} | {'TGS':<5} | {'AKHIR':<6} | {'GRADE':<5}")
    print(f"{'-'*75}")
    
    if not target_data:
        print("Data kosong/tidak ditemukan.")
        return

    for mhs in target_data:
        akhir = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        grade = tentukan_grade(akhir)
        
        print(f"{mhs['nama']:<15} | {mhs['nim']:<10} | {mhs['nilai_uts']:<5} | {mhs['nilai_uas']:<5} | {mhs['nilai_tugas']:<5} | {akhir:<6.2f} | {grade:<5}")
    print(f"{'='*75}\n")

# --- ANALYTICAL FUNCTIONS ---

def cari_ekstrem(mode='tertinggi'):
    if not database_mahasiswa:
        return None
    
    # Menggunakan lambda function untuk sorting key
    sorted_data = sorted(database_mahasiswa, 
                         key=lambda x: hitung_nilai_akhir(x['nilai_uts'], x['nilai_uas'], x['nilai_tugas']), 
                         reverse=(mode == 'tertinggi'))
    return sorted_data[0]

def hitung_rata_rata_kelas():
    if not database_mahasiswa: return 0
    
    total_nilai = 0
    for mhs in database_mahasiswa:
        total_nilai += hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
    
    return total_nilai / len(database_mahasiswa)

def filter_by_grade(target_grade):
    filtered = []
    for mhs in database_mahasiswa:
        akhir = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        if tentukan_grade(akhir) == target_grade.upper():
            filtered.append(mhs)
    return filtered

# --- INPUT FUNCTION ---

def tambah_mahasiswa():
    print("\n--- Input Data Mahasiswa Baru ---")
    nama = input("Nama: ")
    nim = input("NIM: ")
    try:
        uts = float(input("Nilai UTS: "))
        uas = float(input("Nilai UAS: "))
        tugas = float(input("Nilai Tugas: "))
        
        data_baru = {
            "nama": nama,
            "nim": nim,
            "nilai_uts": uts,
            "nilai_uas": uas,
            "nilai_tugas": tugas
        }
        database_mahasiswa.append(data_baru)
        print("✅ Data berhasil ditambahkan!")
    except ValueError:
        print("❌ Input Error: Nilai harus berupa angka!")

# --- MAIN MENU ---

def main():
    while True:
        print("\n--- SYSTEM AKADEMIK NEXII ---")
        print("1. Tampilkan Semua Data")
        print("2. Tambah Mahasiswa")
        print("3. Cari Nilai Tertinggi & Terendah")
        print("4. Filter Berdasarkan Grade")
        print("5. Lihat Rata-Rata Kelas")
        print("0. Keluar")
        
        pilihan = input("Pilih menu (0-5): ")

        if pilihan == '1':
            tampilkan_tabel()
        elif pilihan == '2':
            tambah_mahasiswa()
        elif pilihan == '3':
            top = cari_ekstrem('tertinggi')
            bot = cari_ekstrem('terendah')
            # Calculate scores for display
            score_top = hitung_nilai_akhir(top['nilai_uts'], top['nilai_uas'], top['nilai_tugas'])
            score_bot = hitung_nilai_akhir(bot['nilai_uts'], bot['nilai_uas'], bot['nilai_tugas'])
            
            print(f"\n🏆 Highest: {top['nama']} ({score_top:.2f})")
            print(f"📉 Lowest : {bot['nama']} ({score_bot:.2f})")
        elif pilihan == '4':
            g = input("Masukkan Grade yang dicari (A-E): ")
            hasil = filter_by_grade(g)
            print(f"\nFilter Grade: {g.upper()}")
            tampilkan_tabel(hasil)
        elif pilihan == '5':
            avg = hitung_rata_rata_kelas()
            print(f"\n📊 Rata-rata Nilai Kelas: {avg:.2f}")
        elif pilihan == '0':
            print("Exiting system. Peace out.")
            break
        else:
            print("Menu tidak valid.")

if __name__ == "__main__":
    main()