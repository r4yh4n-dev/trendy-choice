/* Bangladesh administrative locations — Division → District → Upazila/Thana
   Used by checkout for cascading address selection. */
window.TC_LOCATIONS = {
  "dhaka": {
    "name": { "bn": "ঢাকা", "en": "Dhaka" },
    "districts": {
      "dhaka": { "name": { "bn": "ঢাকা", "en": "Dhaka" }, "upazilas": ["Dhamrai","Dohar","Keraniganj","Nawabganj","Savar","Dhaka Metro (Gulshan)","Dhaka Metro (Mirpur)","Dhaka Metro (Uttara)","Dhaka Metro (Dhanmondi)","Dhaka Metro (Motijheel)"] },
      "gazipur": { "name": { "bn": "গাজীপুর", "en": "Gazipur" }, "upazilas": ["Gazipur Sadar","Kaliakair","Kaliganj","Kapasia","Sreepur"] },
      "narayanganj": { "name": { "bn": "নারায়ণগঞ্জ", "en": "Narayanganj" }, "upazilas": ["Araihazar","Bandar","Narayanganj Sadar","Rupganj","Sonargaon"] },
      "tangail": { "name": { "bn": "টাঙ্গাইল", "en": "Tangail" }, "upazilas": ["Basail","Bhuapur","Delduar","Dhanbari","Ghatail","Gopalpur","Kalihati","Madhupur","Mirzapur","Nagarpur","Sakhipur","Tangail Sadar"] },
      "kishoreganj": { "name": { "bn": "কিশোরগঞ্জ", "en": "Kishoreganj" }, "upazilas": ["Austagram","Bajitpur","Bhairab","Hossainpur","Itna","Karimganj","Katiadi","Kishoreganj Sadar","Kuliarchar","Mithamain","Nikli","Pakundia","Tarail"] },
      "manikganj": { "name": { "bn": "মানিকগঞ্জ", "en": "Manikganj" }, "upazilas": ["Daulatpur","Ghior","Harirampur","Manikganj Sadar","Saturia","Shivalaya","Singair"] },
      "munshiganj": { "name": { "bn": "মুন্সিগঞ্জ", "en": "Munshiganj" }, "upazilas": ["Gazaria","Lohajang","Munshiganj Sadar","Sirajdikhan","Sreenagar","Tongibari"] },
      "narsingdi": { "name": { "bn": "নরসিংদী", "en": "Narsingdi" }, "upazilas": ["Belabo","Monohardi","Narsingdi Sadar","Palash","Raipura","Shibpur"] },
      "faridpur": { "name": { "bn": "ফরিদপুর", "en": "Faridpur" }, "upazilas": ["Alfadanga","Bhanga","Boalmari","Charbhadrasan","Faridpur Sadar","Madhukhali","Nagarkanda","Sadarpur","Saltha"] },
      "gopalganj": { "name": { "bn": "গোপালগঞ্জ", "en": "Gopalganj" }, "upazilas": ["Gopalganj Sadar","Kashiani","Kotalipara","Muksudpur","Tungipara"] },
      "madaripur": { "name": { "bn": "মাদারীপুর", "en": "Madaripur" }, "upazilas": ["Kalkini","Madaripur Sadar","Rajoir","Shibchar"] },
      "rajbari": { "name": { "bn": "রাজবাড়ী", "en": "Rajbari" }, "upazilas": ["Baliakandi","Goalandaghat","Kalukhali","Pangsha","Rajbari Sadar"] },
      "shariatpur": { "name": { "bn": "শরীয়তপুর", "en": "Shariatpur" }, "upazilas": ["Bhedarganj","Damudya","Gosairhat","Naria","Shariatpur Sadar","Zanjira"] }
    }
  },
  "chattogram": {
    "name": { "bn": "চট্টগ্রাম", "en": "Chattogram" },
    "districts": {
      "chattogram": { "name": { "bn": "চট্টগ্রাম", "en": "Chattogram" }, "upazilas": ["Anwara","Banshkhali","Boalkhali","Chandanaish","Fatikchhari","Hathazari","Lohagara","Mirsharai","Patiya","Rangunia","Raozan","Sandwip","Satkania","Sitakunda","Chattogram Metro (Pahartali)","Chattogram Metro (Kotwali)"] },
      "coxsbazar": { "name": { "bn": "কক্সবাজার", "en": "Cox's Bazar" }, "upazilas": ["Chakaria","Cox's Bazar Sadar","Kutubdia","Maheshkhali","Ramu","Teknaf","Ukhia","Pekua"] },
      "cumilla": { "name": { "bn": "কুমিল্লা", "en": "Cumilla" }, "upazilas": ["Barura","Brahmanpara","Burichang","Chandina","Chauddagram","Cumilla Sadar","Daudkandi","Debidwar","Homna","Laksam","Meghna","Monohorgonj","Muradnagar","Nangalkot","Titas"] },
      "brahmanbaria": { "name": { "bn": "ব্রাহ্মণবাড়িয়া", "en": "Brahmanbaria" }, "upazilas": ["Akhaura","Ashuganj","Bancharampur","Bijoynagar","Brahmanbaria Sadar","Kasba","Nabinagar","Nasirnagar","Sarail"] },
      "chandpur": { "name": { "bn": "চাঁদপুর", "en": "Chandpur" }, "upazilas": ["Chandpur Sadar","Faridganj","Haimchar","Haziganj","Kachua","Matlab Dakshin","Matlab Uttar","Shahrasti"] },
      "feni": { "name": { "bn": "ফেনী", "en": "Feni" }, "upazilas": ["Chhagalnaiya","Daganbhuiyan","Feni Sadar","Fulgazi","Parshuram","Sonagazi"] },
      "lakshmipur": { "name": { "bn": "লক্ষ্মীপুর", "en": "Lakshmipur" }, "upazilas": ["Kamalnagar","Lakshmipur Sadar","Raipur","Ramganj","Ramgati"] },
      "noakhali": { "name": { "bn": "নোয়াখালী", "en": "Noakhali" }, "upazilas": ["Begumganj","Chatkhil","Companiganj","Hatiya","Kabirhat","Senbagh","Sonaimuri","Subarnachar","Noakhali Sadar"] },
      "rangamati": { "name": { "bn": "রাঙ্গামাটি", "en": "Rangamati" }, "upazilas": ["Bagaichhari","Barkal","Kaptai","Kawkhali","Juraichhari","Langadu","Naniarchar","Rajasthali","Rangamati Sadar"] },
      "bandarban": { "name": { "bn": "বান্দরবান", "en": "Bandarban" }, "upazilas": ["Alikadam","Bandarban Sadar","Lama","Naikhongchhari","Rowangchhari","Ruma","Thanchi"] },
      "khagrachhari": { "name": { "bn": "খাগড়াছড়ি", "en": "Khagrachhari" }, "upazilas": ["Dighinala","Khagrachhari Sadar","Lakshmichhari","Mahalchhari","Manikchhari","Matiranga","Panchhari","Ramgarh"] }
    }
  },
  "rajshahi": {
    "name": { "bn": "রাজশাহী", "en": "Rajshahi" },
    "districts": {
      "rajshahi": { "name": { "bn": "রাজশাহী", "en": "Rajshahi" }, "upazilas": ["Bagha","Bagmara","Charghat","Durgapur","Godagari","Mohanpur","Paba","Puthia","Tanore","Rajshahi Metro"] },
      "bogura": { "name": { "bn": "বগুড়া", "en": "Bogura" }, "upazilas": ["Adamdighi","Bogura Sadar","Dhunat","Dhupchanchia","Gabtali","Kahaloo","Nandigram","Sariakandi","Shajahanpur","Sherpur","Shibganj","Sonatola"] },
      "pabna": { "name": { "bn": "পাবনা", "en": "Pabna" }, "upazilas": ["Atgharia","Bera","Bhangura","Chatmohar","Faridpur","Ishwardi","Pabna Sadar","Santhia","Sujanagar"] },
      "sirajganj": { "name": { "bn": "সিরাজগঞ্জ", "en": "Sirajganj" }, "upazilas": ["Belkuchi","Chauhali","Kamarkhanda","Kazipur","Raiganj","Shahjadpur","Sirajganj Sadar","Tarash","Ullahpara"] },
      "natore": { "name": { "bn": "নাটোর", "en": "Natore" }, "upazilas": ["Bagatipara","Baraigram","Gurudaspur","Lalpur","Naldanga","Natore Sadar","Singra"] },
      "naogaon": { "name": { "bn": "নওগাঁ", "en": "Naogaon" }, "upazilas": ["Atrai","Badalgachhi","Dhamoirhat","Manda","Mahadebpur","Naogaon Sadar","Niamatpur","Patnitala","Porsha","Raninagar","Sapahar"] },
      "joypurhat": { "name": { "bn": "জয়পুরহাট", "en": "Joypurhat" }, "upazilas": ["Akkelpur","Joypurhat Sadar","Kalai","Khetlal","Panchbibi"] },
      "chapainawabganj": { "name": { "bn": "চাঁপাইনবাবগঞ্জ", "en": "Chapainawabganj" }, "upazilas": ["Bholahat","Gomastapur","Nachole","Chapainawabganj Sadar","Shibganj"] }
    }
  },
  "khulna": {
    "name": { "bn": "খুলনা", "en": "Khulna" },
    "districts": {
      "khulna": { "name": { "bn": "খুলনা", "en": "Khulna" }, "upazilas": ["Batiaghata","Dacope","Dumuria","Dighalia","Koyra","Paikgachha","Phultala","Rupsha","Terokhada","Khulna Metro"] },
      "jashore": { "name": { "bn": "যশোর", "en": "Jashore" }, "upazilas": ["Abhaynagar","Bagherpara","Chaugachha","Jhikargachha","Keshabpur","Jashore Sadar","Manirampur","Sharsha"] },
      "satkhira": { "name": { "bn": "সাতক্ষীরা", "en": "Satkhira" }, "upazilas": ["Assasuni","Debhata","Kalaroa","Kaliganj","Satkhira Sadar","Shyamnagar","Tala"] },
      "bagerhat": { "name": { "bn": "বাগেরহাট", "en": "Bagerhat" }, "upazilas": ["Bagerhat Sadar","Chitalmari","Fakirhat","Kachua","Mollahat","Mongla","Morrelganj","Rampal","Sarankhola"] },
      "kushtia": { "name": { "bn": "কুষ্টিয়া", "en": "Kushtia" }, "upazilas": ["Bheramara","Daulatpur","Khoksa","Kumarkhali","Kushtia Sadar","Mirpur"] },
      "jhenaidah": { "name": { "bn": "ঝিনাইদহ", "en": "Jhenaidah" }, "upazilas": ["Harinakunda","Jhenaidah Sadar","Kaliganj","Kotchandpur","Maheshpur","Shailkupa"] },
      "magura": { "name": { "bn": "মাগুরা", "en": "Magura" }, "upazilas": ["Magura Sadar","Mohammadpur","Shalikha","Sreepur"] },
      "narail": { "name": { "bn": "নড়াইল", "en": "Narail" }, "upazilas": ["Kalia","Lohagara","Narail Sadar"] },
      "chuadanga": { "name": { "bn": "চুয়াডাঙ্গা", "en": "Chuadanga" }, "upazilas": ["Alamdanga","Chuadanga Sadar","Damurhuda","Jibannagar"] },
      "meherpur": { "name": { "bn": "মেহেরপুর", "en": "Meherpur" }, "upazilas": ["Gangni","Meherpur Sadar","Mujibnagar"] }
    }
  },
  "barishal": {
    "name": { "bn": "বরিশাল", "en": "Barishal" },
    "districts": {
      "barishal": { "name": { "bn": "বরিশাল", "en": "Barishal" }, "upazilas": ["Agailjhara","Babuganj","Bakerganj","Banaripara","Gaurnadi","Hizla","Mehendiganj","Muladi","Wazirpur","Barishal Sadar"] },
      "bhola": { "name": { "bn": "ভোলা", "en": "Bhola" }, "upazilas": ["Bhola Sadar","Burhanuddin","Char Fasson","Daulatkhan","Lalmohan","Manpura","Tazumuddin"] },
      "patuakhali": { "name": { "bn": "পটুয়াখালী", "en": "Patuakhali" }, "upazilas": ["Bauphal","Dashmina","Dumki","Galachipa","Kalapara","Mirzaganj","Patuakhali Sadar","Rangabali"] },
      "pirojpur": { "name": { "bn": "পিরোজপুর", "en": "Pirojpur" }, "upazilas": ["Bhandaria","Kawkhali","Mathbaria","Nazirpur","Nesarabad","Pirojpur Sadar","Zianagar"] },
      "barguna": { "name": { "bn": "বরগুনা", "en": "Barguna" }, "upazilas": ["Amtali","Bamna","Barguna Sadar","Betagi","Patharghata","Taltali"] },
      "jhalokati": { "name": { "bn": "ঝালকাঠি", "en": "Jhalokati" }, "upazilas": ["Jhalokati Sadar","Kathalia","Nalchity","Rajapur"] }
    }
  },
  "sylhet": {
    "name": { "bn": "সিলেট", "en": "Sylhet" },
    "districts": {
      "sylhet": { "name": { "bn": "সিলেট", "en": "Sylhet" }, "upazilas": ["Balaganj","Beanibazar","Bishwanath","Companiganj","Fenchuganj","Golapganj","Gowainghat","Jaintiapur","Kanaighat","Osmani Nagar","Zakiganj","Sylhet Sadar"] },
      "moulvibazar": { "name": { "bn": "মৌলভীবাজার", "en": "Moulvibazar" }, "upazilas": ["Barlekha","Juri","Kamalganj","Kulaura","Moulvibazar Sadar","Rajnagar","Sreemangal"] },
      "habiganj": { "name": { "bn": "হবিগঞ্জ", "en": "Habiganj" }, "upazilas": ["Ajmiriganj","Bahubal","Baniyachong","Chunarughat","Habiganj Sadar","Lakhai","Madhabpur","Nabiganj","Shayestaganj"] },
      "sunamganj": { "name": { "bn": "সুনামগঞ্জ", "en": "Sunamganj" }, "upazilas": ["Bishwamvarpur","Chhatak","Derai","Dharampasha","Dowarabazar","Jagannathpur","Jamalganj","Sulla","Sunamganj Sadar","Tahirpur"] }
    }
  },
  "rangpur": {
    "name": { "bn": "রংপুর", "en": "Rangpur" },
    "districts": {
      "rangpur": { "name": { "bn": "রংপুর", "en": "Rangpur" }, "upazilas": ["Badarganj","Gangachara","Kaunia","Mithapukur","Pirgachha","Pirganj","Rangpur Sadar","Taraganj"] },
      "dinajpur": { "name": { "bn": "দিনাজপুর", "en": "Dinajpur" }, "upazilas": ["Birampur","Birganj","Biral","Bochaganj","Chirirbandar","Dinajpur Sadar","Fulbari","Ghoraghat","Hakimpur","Kaharole","Khansama","Nawabganj","Parbatipur"] },
      "gaibandha": { "name": { "bn": "গাইবান্ধা", "en": "Gaibandha" }, "upazilas": ["Fulchhari","Gaibandha Sadar","Gobindaganj","Palashbari","Sadullapur","Saghata","Sundarganj"] },
      "kurigram": { "name": { "bn": "কুড়িগ্রাম", "en": "Kurigram" }, "upazilas": ["Bhurungamari","Char Rajibpur","Chilmari","Kurigram Sadar","Nageshwari","Phulbari","Rajarhat","Raomari","Ulipur"] },
      "lalmonirhat": { "name": { "bn": "লালমনিরহাট", "en": "Lalmonirhat" }, "upazilas": ["Aditmari","Hatibandha","Kaliganj","Lalmonirhat Sadar","Patgram"] },
      "nilphamari": { "name": { "bn": "নীলফামারী", "en": "Nilphamari" }, "upazilas": ["Dimla","Domar","Jaldhaka","Kishoreganj","Nilphamari Sadar","Saidpur"] },
      "panchagarh": { "name": { "bn": "পঞ্চগড়", "en": "Panchagarh" }, "upazilas": ["Atwari","Boda","Debiganj","Panchagarh Sadar","Tetulia"] },
      "thakurgaon": { "name": { "bn": "ঠাকুরগাঁও", "en": "Thakurgaon" }, "upazilas": ["Baliadangi","Haripur","Pirganj","Ranisankail","Thakurgaon Sadar"] }
    }
  },
  "mymensingh": {
    "name": { "bn": "ময়মনসিংহ", "en": "Mymensingh" },
    "districts": {
      "mymensingh": { "name": { "bn": "ময়মনসিংহ", "en": "Mymensingh" }, "upazilas": ["Bhaluka","Dhobaura","Fulbaria","Gaffargaon","Gauripur","Haluaghat","Ishwarganj","Muktagachha","Mymensingh Sadar","Nandail","Phulpur","Tarakanda","Trishal"] },
      "jamalpur": { "name": { "bn": "জামালপুর", "en": "Jamalpur" }, "upazilas": ["Baksiganj","Dewanganj","Islampur","Jamalpur Sadar","Madarganj","Melandaha","Sarishabari"] },
      "netrokona": { "name": { "bn": "নেত্রকোণা", "en": "Netrokona" }, "upazilas": ["Atpara","Barhatta","Durgapur","Khaliajuri","Kalmakanda","Madan","Mohanganj","Netrokona Sadar","Purbadhala"] },
      "sherpur": { "name": { "bn": "শেরপুর", "en": "Sherpur" }, "upazilas": ["Jhenaigati","Nakla","Nalitabari","Sherpur Sadar","Sreebardi"] }
    }
  }
};
