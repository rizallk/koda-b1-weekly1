const { createInterface } = require('node:readline');

const url = 'https://jsonplaceholder.typicode.com/users';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const formatRupiah = (jumlah) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // menghilangkan angka di belakang koma
  }).format(jumlah);
};

async function fetchUser(property) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (property === 'name') {
      return data[6]?.name;
    } else if (property === 'username') {
      return data[6]?.username;
    } else if (property === 'email') {
      return data[6]?.email;
    } else {
      return 'Property lain belum tersedia';
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error Message:', error.message);
    } else {
      console.log('Error:', error);
    }
  }
}

function promo1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'OR Bucket Anniv 47th',
        detail:
          '1 Pc Whole Chicken Bucket OR + 4 Pcs Rice Organic + 4 Pc Coke Zero Reg',
        price: 147200,
      });
    }, 950);
  });
}

const promo2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 2,
        name: 'OR Duo Anniv 47th',
        detail:
          '2 Pcs Chicken OR + 2 Pcs Rice Organic + 1 Pc FF Large + 2 Pcs Coke Zero Reg',
        price: 74000,
      });
    }, 600);
  });
};

const promo3 = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 3,
        name: 'SB2 Plus Cinepolis',
        detail: '2 Pcs Chicken + 1 Pc Rice + 1 Coca Cola Med',
        price: 46300,
      });
    }, 1200);
  });
};

function printWelcomeMessage(msg) {
  console.log('\n|======================================|');
  console.log('|                                      |');
  console.log(`|        ${msg.toUpperCase()}         |`);
  console.log('|                                      |');
  console.log('|======================================|\n');
}

const menuKFC1 = [
  {
    id: 1,
    name: 'Chicken',
    detail: '',
    price: 21800,
  },
  {
    id: 2,
    name: 'Super Besar 1',
    detail: '1 pc Chicken + 1 Rice + 1 Coca-Cola Medium',
    price: 35400,
  },
  {
    id: 3,
    name: 'Super Besar 2',
    detail: '2 pc Chicken + 1 Rice + 1 Coca-Cola Medium',
    price: 46300,
  },
  {
    id: 4,
    name: 'KFC Kombo Winger',
    detail: '1 pc Winger + 1 pc Rice + 1 pc Cola Reg',
    price: 31800,
  },
  {
    id: 5,
    name: 'KFC Winger',
    detail: '',
    price: 27200,
  },
];
const menuKFC2 = [
  {
    id: 6,
    name: 'French Fries Large',
    detail: '',
    price: 23600,
  },
  {
    id: 7,
    name: 'French Fries',
    detail: '',
    price: 19000,
  },
  {
    id: 8,
    name: 'Choconut Sundae',
    detail: '',
    price: 10000,
  },
  {
    id: 9,
    name: 'Soft Ice Cream',
    detail: '',
    price: 7200,
  },
  {
    id: 10,
    name: 'Coca-Cola Medium',
    detail: '',
    price: 11800,
  },
];
const menuKFCData = [...menuKFC1, ...menuKFC2];

const alamatKFC = [
  {
    name: 'KFC Cibubur Cikeas',
    address:
      'Jl. Alternatif Cibubur No.Km.60, RT.002/RW.007, Nagrak, Kec. Gn. Putri, Kabupaten Bogor, Jawa Barat 16820',
    layanan1: 'Dine-in',
    layanan2: 'take-away',
    layanan3: 'drive-through',
    printLayanan: function () {
      return `${this.layanan1}, ${this.layanan2}, ${this.layanan3}`;
    },
  },
  {
    name: 'KFC Harvest City, Cileungsi',
    address:
      'Jl. Harvest City Boulevard, Mekarsari, Kec. Cileungsi, Kabupaten Bogor',
  },
  {
    name: 'KFC (Cileungsi)',
    address:
      'Jalan Taman Metro Raya No.99, Cileungsi Kidul, Kec. Cileungsi, Kabupaten Bogor',
  },
];

const keranjang = [];
const checkout = [];
let menuSelected = 'menu'; // 'menu' atau 'promo'
let promoKFCData = [];

const menuKFC = function () {
  console.log('\n============== MAIN MENU ===============');
  menuKFCData.forEach((v, i) => {
    i > 8
      ? console.log(`${v.id}. ${v.name}`)
      : console.log(`${v.id}.  ${v.name}`);
    if (v.detail) console.log(`    Detail: ${v.detail}`);
    console.log(`    Harga: ${formatRupiah(v.price)}`);
  });
  console.log('0.  Kembali');
};

const promoKFC = async () => {
  console.log('\n============= MENU PROMO ===============\n');

  // Direset agar data tidak duplicate ketika menu dipanggil berulang
  promoKFCData = [];

  function printFormat(data) {
    data.id > 9
      ? console.log(`${data.id}. ${data.name}`)
      : console.log(`${data.id}.  ${data.name}`);
    if (data.detail) console.log(`    Detail: ${data.detail}`);
    console.log(`    Harga: ${formatRupiah(data.price)}`);
  }

  waitMsg({ isLastNewLine: true });

  await promo1()
    .then((res) => {
      printFormat(res);
      promoKFCData.push(res);
      return promo2(res);
    })
    .then((res) => {
      printFormat(res);
      promoKFCData.push(res);
      return promo3(res);
    })
    .then((res) => {
      printFormat(res);
      promoKFCData.push(res);
      return res;
    })
    .catch((error) => {
      console.log(error);
    });

  console.log('0.  Kembali');
};

const waitMsg = ({ isFirstNewLine, isLastNewLine } = {}) => {
  console.log(
    `${isFirstNewLine ? '\n' : ''}Sedang memuat data...${isLastNewLine ? '\n' : ''}`,
  );
};

const mainMenuArr = [
  '1. Menu',
  '2. Promo',
  '3. Riwayat checkout',
  '4. Lihat profil saya',
  '5. Alamat KFC',
  '6. Exit',
];

function printMainMenu() {
  console.log('\n============= MENU UTAMA ===============');
  for (let i = 0; i < mainMenuArr.length; i++) {
    console.log(`${mainMenuArr[i]}`);
  }
}

const handleOrder = () => {
  console.log('----------------------------------------');
  rl.question('Pilih : ', async (inputMenu) => {
    const menuId = Number(inputMenu);

    if (menuId === 0 && typeof menuId === 'number') {
      printMainMenu();
      return handleMainMenu();
    }

    const selectedMenu =
      menuSelected === 'menu'
        ? menuKFCData.find((v, index) => index + 1 === menuId)
        : promoKFCData.find((v, index) => index + 1 === menuId);

    if (!selectedMenu) {
      console.log(
        'Menu tidak valid! Silakan masukkan nomor menu yang tersedia.',
      );
      return handleOrder();
    }

    console.log(`\nTerpilih: ${selectedMenu.name}`);
    askQuantity(selectedMenu);
  });
};

const askQuantity = (selectedMenu) => {
  rl.question(`Masukkan jumlah (qty): `, (inputQty) => {
    const qty = Number(inputQty);

    if (isNaN(qty) || qty <= 0) {
      console.log('Jumlah tidak valid! Harap masukkan angka lebih dari 0.');
      return askQuantity(selectedMenu);
    }

    keranjang.push({
      menu: selectedMenu,
      qty: qty,
      subtotal: selectedMenu.price * qty,
    });

    console.log(
      `\nBerhasil menambahkan ${qty}x ${selectedMenu.name} ke keranjang.`,
    );
    opsiSetelahOrder();
  });
};

const opsiSetelahOrder = () => {
  console.log('\nOpsi selanjutnya:');
  console.log('1. Tambah menu lain');
  console.log('2. Lanjut ke Pembayaran (Checkout)');
  console.log('0. Kembali ke Menu Utama');
  console.log('----------------------------------------');

  rl.question('Pilih : ', async (act) => {
    if (act === '1') {
      menuSelected === 'menu' ? menuKFC() : await promoKFC();
      handleOrder();
    } else if (act === '2') {
      processCheckout();
    } else if (act === '0') {
      printMainMenu();
      handleMainMenu();
    } else {
      console.log('Pilihan tidak valid! Silakan masukkan angka 0, 1, atau 2.');
      opsiSetelahOrder();
    }
  });
};

const processCheckout = async () => {
  if (keranjang.length === 0) {
    console.log('\nKeranjang Anda kosong! Silakan pesan menu terlebih dahulu.');
    printMainMenu();
    return handleMainMenu();
  }

  console.log('\n=========== RINCIAN PESANAN ============');
  let total = 0;
  const name = await fetchUser('name');

  console.log('Nama Pemesan :', name);
  keranjang.forEach((item, index) => {
    console.log(`${index + 1}. ${item.menu.name} (x${item.qty})`);
    console.log(`   Subtotal: ${formatRupiah(item.subtotal)}`);
    total += item.subtotal;
  });
  console.log('----------------------------------------');
  console.log(`TOTAL BAYAR: ${formatRupiah(total)}`);

  confirmCheckout(name, total);
};

const confirmCheckout = (name, total) => {
  rl.question('\nKonfirmasi untuk Checkout (Y/n) : ', (confirm) => {
    const answer = confirm.toLowerCase();

    if (answer !== 'y' && answer !== 'n') {
      console.log(
        'Pilihan tidak tersedia. Masukkan "Y" untuk ya atau "n" untuk membatalkan.',
      );
      return confirmCheckout(name, total);
    }

    if (answer === 'y') {
      console.log(`\nPembayaran Berhasil!`);

      checkout.push({
        date: new Date().toLocaleString('id-ID'),
        items: [...keranjang],
        total: total,
      });

      keranjang.length = 0;
      console.log(`Terima kasih ${name} telah berbelanja di KFC!`);
    } else {
      console.log(
        `\nAnda telah membatalkan pesanan. Pesanan telah dihapus dari keranjang.`,
      );
      keranjang.length = 0;
    }

    printMainMenu();
    handleMainMenu();
  });
};

const riwayatCheckout = async () => {
  if (checkout.length === 0) {
    console.log('\nBelum ada riwayat checkout.');
  } else {
    console.log('\n=========== RIWAYAT CHECKOUT ===========');
    const name = await fetchUser('name');

    checkout.forEach((trx, i) => {
      console.log(`\nTransaksi #${i + 1}\nTanggal: ${trx.date}`);
      trx.items.forEach((item) => {
        console.log(
          `- ${item.menu.name} (x${item.qty}) : ${formatRupiah(item.subtotal)}`,
        );
      });
      console.log(`Total Belanja : ${formatRupiah(trx.total)}`);
      console.log(`Nama Pemesan  : ${name}`);
    });
    console.log('----------------------------------------');
  }

  printMainMenu();
  handleMainMenu();
};

const handleMainMenu = async () => {
  console.log('----------------------------------------');

  rl.question('Pilih : ', async (inputMainMenu) => {
    const input = Number(inputMainMenu);

    switch (input) {
      case 1:
        menuSelected = 'menu';
        menuKFC();
        handleOrder();
        break;
      case 2:
        menuSelected = 'promo';
        await promoKFC();
        handleOrder();
        break;
      case 3:
        await riwayatCheckout();
        break;
      case 4:
        waitMsg({ isFirstNewLine: true });
        const name = await fetchUser('name');
        const username = await fetchUser('username');
        const email = await fetchUser('email');

        console.log(`\nNama     : ${name}`);
        console.log(`Username : ${username}`);
        console.log(`Email    : ${email}`);

        printMainMenu();
        handleMainMenu();
        break;
      case 5:
        console.log('\n========= ALAMAT KFC TERDEKAT ==========');

        for (let i = 0; i < 3; i++) {
          const { name, address, printLayanan } = alamatKFC[i];
          console.log(`${i + 1}. ${name}`);
          console.log(`   Alamat : ${address}`);
          if (printLayanan)
            console.log(`   Layanan : ${printLayanan.call(alamatKFC[i])}`);
        }

        printMainMenu();
        handleMainMenu();
        break;
      case 6:
        rl.close();
        const exitName = await fetchUser('name');
        console.log(
          `\nTerima kasih ${exitName} sudah menggunakan layanan kami!`,
        );
        break;
      default:
        console.log('\nOpsi tidak tersedia. Silakan pilih nomor 1 sampai 5.');
        printMainMenu();
        handleMainMenu();
        break;
    }
  });
};

const main = async (cb) => {
  printWelcomeMessage('selamat datang di kfc');

  waitMsg();
  const name = await fetchUser('name');
  console.log(`\nHalo, ${name}!`);

  cb();
};

main(() => {
  printMainMenu();
  handleMainMenu();
});
