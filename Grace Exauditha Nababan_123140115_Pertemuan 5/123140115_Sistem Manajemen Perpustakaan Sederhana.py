from abc import ABC, abstractmethod

# 1. ABSTRACT BASE CLASS (Abstraction)
class LibraryItem(ABC):
    """
    Blueprint untuk semua item. 
    Menggunakan ABC agar tidak bisa di-instansiasi langsung.
    """
    def __init__(self, item_id: str, title: str):
        # Encapsulation: Atribut protected (_)
        self._item_id = item_id
        self._title = title

    # Property Decorator (Getter)
    @property
    def title(self):
        """Mengembalikan judul dengan format Title Case."""
        return self._title.title()
    
    @property
    def item_id(self):
        return self._item_id

    # Abstract Method 
    @abstractmethod
    def get_details(self) -> str:
        pass


# 2. SUBCLASSES (Inheritance & Polymorphism)
class Book(LibraryItem):
    def __init__(self, item_id: str, title: str, author: str, pages: int):
        super().__init__(item_id, title)
        self._author = author
        self._pages = pages

    # Implementasi spesifik untuk Buku
    def get_details(self) -> str:
        return f"[Buku]    ID: {self.item_id} | '{self.title}' oleh {self._author} ({self._pages} hal)"


class Magazine(LibraryItem):
    def __init__(self, item_id: str, title: str, issue_no: str, category: str):
        super().__init__(item_id, title)
        self._issue_no = issue_no
        self._category = category

    # Implementasi spesifik untuk Majalah
    def get_details(self) -> str:
        return f"[Majalah] ID: {self.item_id} | '{self.title}' - Edisi {self._issue_no} ({self._category})"


# 3. LIBRARY MANAGER (Logic & Storage)
class Library:
    def __init__(self):
        # Encapsulation: Private list (__)
        self.__collection = []

    def _is_id_exist(self, item_id: str) -> bool:
        """Helper method untuk mengecek apakah ID sudah ada."""
        for item in self.__collection:
            if item.item_id == item_id:
                return True
        return False

    def add_item(self, item: LibraryItem):
        """Menambahkan item dengan validasi ID unik."""
        if self._is_id_exist(item.item_id):
            print("Gagal: Item dengan ID '{item.item_id}' sudah ada!")
        else:
            self.__collection.append(item)
            print(f"Berhasil menambahkan: {item.title}")

    def display_items(self):
        print("\n" + "="*40)
        print("      PERPUSTAKAAN XXYZ      ")     
        print("="*40)
        if not self.__collection:
            print("(Koleksi kosong, silakan tambah item)")
        else:
            for item in self.__collection:
                # Polymorphism: method sama, output beda tergantung tipe objek
                print(item.get_details())
        print("="*40 + "\n")

    def search_item(self, keyword: str):
        print(f"\n Mencari '{keyword}'...")
        results = []
        for item in self.__collection:
            # Pencarian case-insensitive pada Judul atau ID
            if keyword.lower() in item.title.lower() or keyword.lower() == item.item_id.lower():
                results.append(item)
        
        if results:
            for res in results:
                print(f"   -> Ditemukan: {res.get_details()}")
        else:
            print("Item tidak ditemukan.")


# 4. MAIN INTERFACE (CLI Loop)
def main():
    # Inisialisasi Sistem
    lib = Library()
    
    # Data Awal 
    lib.add_item(Book("01", "Cle4" \
    "", "Robert C. Martin", 464))
    lib.add_item(Magazine("02", "Wired", "Agustus 2025", "Teknologi"))

    while True:
        print("1. Tambah Buku")
        print("2. Tambah Majalah")
        print("3. Lihat Semua Koleksi")
        print("4. Cari Item")
        print("5. Keluar")
        
        choice = input(">> Pilih menu (1-5): ")

        if choice == '1':
            print("\n--- Tambah Buku Baru ---")
            uid = input("Masukkan ID Buku : ")
            title = input("Judul Buku       : ")
            author = input("Penulis          : ")
            try:
                pages = int(input("Jumlah Halaman   : "))
                lib.add_item(Book(uid, title, author, pages))
            except ValueError:
                print("Error: Halaman harus berupa angka!")

        elif choice == '2':
            print("\n--- Tambah Majalah Baru ---")
            uid = input("Masukkan ID Majalah : ")
            title = input("Nama Majalah        : ")
            issue = input("Nomor Edisi         : ")
            cat = input("Kategori            : ")
            lib.add_item(Magazine(uid, title, issue, cat))

        elif choice == '3':
            lib.display_items()

        elif choice == '4':
            key = input("\nMasukkan Kata Kunci (Judul/ID): ")
            lib.search_item(key)

        elif choice == '5':
            print("BYe-Bye!!")
            break
        
        else:
            print("Input gak valid bro, coba lagi.")
        
        print("-" * 20)

if __name__ == "__main__":
    main()
