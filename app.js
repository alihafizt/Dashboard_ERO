// =========================================
// LOGIKA DARK MODE / LIGHT MODE
// =========================================
function toggleTheme() {
  const htmlEl = document.documentElement;
  const currentTheme = htmlEl.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', newTheme);
  localStorage.setItem('dashboard-theme', newTheme);
  updateThemeIcon(newTheme);
}
function updateThemeIcon(theme) {
  // Pakai SVG inline (bukan font-icon eksternal) supaya ikon tombol tema
  // selalu tampil walau font ikon gagal/lambat dimuat.
  const moonIcon = document.getElementById('themeIconMoon');
  const sunIcon = document.getElementById('themeIconSun');
  if (moonIcon && sunIcon) {
    moonIcon.style.display = theme === 'dark' ? 'none' : 'block';
    sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
  }
}
(function initTheme(){
  const savedTheme = localStorage.getItem('dashboard-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
})();

let rows = [];
let lastUpdateLabel = '';
let lastWithTotals = [];
const fields = ['device','acc','operator','boltech','arAcc','arBoltech'];

const SEED = [{"name":"Feren Dwi Astuti","target":{"device":200000000,"acc":9000000,"operator":4000000,"boltech":7000000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":31,"deviceVal":208367565,"accQty":51,"accVal":12787828,"operator":7990089,"boltechQty":4,"boltechVal":2158559,"arAcc":1.64516129032258,"arBoltech":0.129032258064516},"est":{"device":1.041837825,"acc":1.42086977777778,"operator":1.99752225,"boltech":0.308365571428571,"arAcc":1.64516129032258,"arBoltech":0.129032258064516},"device":3,"acc":3,"operator":1,"boltech":0,"arAcc":1,"arBoltech":0.5,"store":"ERAFONE & MORE SAWOJAJAR MALANG"},{"name":"Patria Rafie Alief Faiz","target":{"device":162855000,"acc":5198000,"operator":2865000,"boltech":2166000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":25,"deviceVal":155485584,"accQty":34,"accVal":7762607,"operator":1473874,"boltechQty":4,"boltechVal":2203602,"arAcc":1.36,"arBoltech":0.16},"est":{"device":0.954748604586902,"acc":1.49338341669873,"operator":0.514441186736475,"boltech":1.01736011080332,"arAcc":1.36,"arBoltech":0.16},"device":3,"acc":3,"operator":0,"boltech":1,"arAcc":0.5,"arBoltech":1,"store":"ERAFONE RUKO DAMPIT"},{"name":"Nur Fadhilah","target":{"device":108753064,"acc":5620173,"operator":1499001,"boltech":4063045,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":17,"deviceVal":148858558,"accQty":33,"accVal":7310265,"operator":3937836,"boltechQty":2,"boltechVal":1079280,"arAcc":1.94117647058824,"arBoltech":0.117647058823529},"est":{"device":1.36877576157303,"acc":1.30071885687505,"operator":2.62697356439389,"boltech":0.265633287349759,"arAcc":1.94117647058824,"arBoltech":0.117647058823529},"device":3,"acc":3,"operator":1,"boltech":0,"arAcc":1,"arBoltech":0.2,"store":"ERAFONE MALL ARAYA MALANG"},{"name":"Reynaldi Dwi Himawan","target":{"device":108753064,"acc":5620173,"operator":1499001,"boltech":4063045,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":15,"deviceVal":106833333,"accQty":15,"accVal":5226030,"operator":1396397,"boltechQty":3,"boltechVal":4006306,"arAcc":1,"arBoltech":0.2},"est":{"device":0.98234779849513,"acc":0.929869952401821,"operator":0.9315517467967,"boltech":0.98603535033454,"arAcc":1,"arBoltech":0.2},"device":3,"acc":2,"operator":0.5,"boltech":1,"arAcc":0.5,"arBoltech":1,"store":"ERAFONE MALL ARAYA MALANG"},{"name":"Arsita Winanafsi Radita Debbi","target":{"device":1183166149,"acc":41598200,"operator":17500000,"boltech":20000000,"arAcc":1.8,"arBoltech":0.15},"ach":{"deviceQty":63,"deviceVal":1058276580,"accQty":98,"accVal":45092799,"operator":26981534,"boltechQty":15,"boltechVal":24806303,"arAcc":1.55555555555556,"arBoltech":0.238095238095238},"est":{"device":0.894444606021263,"acc":1.0840084186335,"operator":1.54180194285714,"boltech":1.24031515,"arAcc":1.55555555555556,"arBoltech":0.238095238095238},"device":1.5,"acc":3,"operator":1,"boltech":1,"arAcc":0.5,"arBoltech":1,"store":"IBOX SOEKARNO HATTA MALANG"},{"name":"Handika Dewa Tengku Firmansyah","target":{"device":108753064,"acc":5620173,"operator":1499001,"boltech":4063045,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":14,"deviceVal":185572974,"accQty":31,"accVal":5804322,"operator":1747747,"boltechQty":1,"boltechVal":1125225,"arAcc":2.21428571428571,"arBoltech":0.0714285714285714},"est":{"device":1.7063700752376,"acc":1.03276571735425,"operator":1.16594118349487,"boltech":0.276941308796728,"arAcc":2.21428571428571,"arBoltech":0.0714285714285714},"device":3,"acc":3,"operator":1,"boltech":0,"arAcc":1,"arBoltech":0,"store":"ERAFONE MALL ARAYA MALANG"},{"name":"Mustafidurrohman","target":{"device":101015016,"acc":6825545,"operator":1334173,"boltech":4554536,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":19,"deviceVal":99982882,"accQty":17,"accVal":11650261,"operator":2207206,"boltechQty":1,"boltechVal":359459,"arAcc":0.894736842105263,"arBoltech":0.0526315789473684},"est":{"device":0.9897823705735,"acc":1.70686164987558,"operator":1.65436266511165,"boltech":0.0789232975653283,"arAcc":0.894736842105263,"arBoltech":0.0526315789473684},"device":3,"acc":3,"operator":1,"boltech":0,"arAcc":0.2,"arBoltech":0,"store":"ERAFONE LIPPO PLAZA BATU"},{"name":"Khairul Anwar","target":{"device":181500000,"acc":10000000,"operator":6000000,"boltech":5000000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":25,"deviceVal":165887390,"accQty":47,"accVal":10461259,"operator":6378378,"boltechQty":1,"boltechVal":629730,"arAcc":1.88,"arBoltech":0.04},"est":{"device":0.913980110192837,"acc":1.0461259,"operator":1.063063,"boltech":0.125946,"arAcc":1.88,"arBoltech":0.04},"device":2,"acc":3,"operator":1,"boltech":0,"arAcc":1,"arBoltech":0,"store":"ERAFONE & MORE TUMENGGUNG SURYO"},{"name":"Faisel Arif Mustofa Sansofyan","target":{"device":788777433,"acc":36707209,"operator":17500000,"boltech":20000000,"arAcc":1.8,"arBoltech":0.15},"ach":{"deviceQty":50,"deviceVal":772837839,"accQty":91,"accVal":82503700,"operator":8567118,"boltechQty":7,"boltechVal":9498197,"arAcc":1.82,"arBoltech":0.14},"est":{"device":0.979792025819785,"acc":2.24761572038887,"operator":0.4895496,"boltech":0.47490985,"arAcc":1.82,"arBoltech":0.14},"device":3,"acc":3,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0.5,"store":"IBOX SOEKARNO HATTA MALANG"},{"name":"Mohamad Hilmi Abidin","target":{"device":200000000,"acc":60000000,"operator":6500000,"boltech":5500000,"arAcc":2,"arBoltech":0.15},"ach":{"deviceQty":44,"deviceVal":230474774,"accQty":94,"accVal":67951085,"operator":4810811,"boltechQty":2,"boltechVal":1475676,"arAcc":2.13636363636364,"arBoltech":0.0454545454545455},"est":{"device":1.15237387,"acc":1.13251808333333,"operator":0.740124769230769,"boltech":0.268304727272727,"arAcc":2.13636363636364,"arBoltech":0.0454545454545455},"device":3,"acc":3,"operator":0,"boltech":0,"arAcc":1,"arBoltech":0,"store":"XIAOMI STORE MAL OLYMPIC GARDEN"},{"name":"Ketut Riani","target":{"device":140000000,"acc":6000000,"operator":2000000,"boltech":3500000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":33,"deviceVal":169258557,"accQty":47,"accVal":6280896,"operator":1711712,"boltechQty":2,"boltechVal":809009,"arAcc":1.42424242424242,"arBoltech":0.0606060606060606},"est":{"device":1.20898969285714,"acc":1.046816,"operator":0.855856,"boltech":0.231145428571429,"arAcc":1.42424242424242,"arBoltech":0.0606060606060606},"device":3,"acc":3,"operator":0.2,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE KESAMBEN BLITAR"},{"name":"Nurul Fithri Asani","target":{"device":414414000,"acc":27027000,"operator":3603603,"boltech":10810810,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":65,"deviceVal":387963964,"accQty":90,"accVal":39460896,"operator":3893694,"boltechQty":4,"boltechVal":888287,"arAcc":1.38461538461538,"arBoltech":0.0615384615384615},"est":{"device":0.936174849305284,"acc":1.46005461205461,"operator":1.08050026598379,"boltech":0.0821665536624915,"arAcc":1.38461538461538,"arBoltech":0.0615384615384615},"device":2,"acc":3,"operator":1,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE RUKO BLITAR"},{"name":"Irma Sofyani","target":{"device":591583074,"acc":26027032,"operator":17500000,"boltech":20000000,"arAcc":1.8,"arBoltech":0.15},"ach":{"deviceQty":43,"deviceVal":695366671,"accQty":70,"accVal":40608116,"operator":6955406,"boltechQty":3,"boltechVal":4096396,"arAcc":1.62790697674419,"arBoltech":0.0697674418604651},"est":{"device":1.17543368220166,"acc":1.56022845785874,"operator":0.397451771428571,"boltech":0.2048198,"arAcc":1.62790697674419,"arBoltech":0.0697674418604651},"device":3,"acc":3,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"IBOX SOEKARNO HATTA MALANG"},{"name":"Ferly Andika Pratama","target":{"device":591583074,"acc":11307206,"operator":17500000,"boltech":20000000,"arAcc":1.8,"arBoltech":0.15},"ach":{"deviceQty":41,"deviceVal":639377478,"accQty":54,"accVal":54245048,"operator":4628829,"boltechQty":3,"boltechVal":3600901,"arAcc":1.31707317073171,"arBoltech":0.0731707317073171},"est":{"device":1.0807906887478,"acc":4.79738743594129,"operator":0.264504514285714,"boltech":0.18004505,"arAcc":1.31707317073171,"arBoltech":0.0731707317073171},"device":3,"acc":3,"operator":0,"boltech":0,"arAcc":0.2,"arBoltech":0,"store":"IBOX SOEKARNO HATTA MALANG"},{"name":"Mochammad Bagas Nirvana","target":{"device":788777433,"acc":17229731,"operator":17500000,"boltech":20000000,"arAcc":1.8,"arBoltech":0.15},"ach":{"deviceQty":59,"deviceVal":886793695,"accQty":59,"accVal":40817123,"operator":1880631,"boltechQty":3,"boltechVal":4096396,"arAcc":1,"arBoltech":0.0508474576271186},"est":{"device":1.12426352212843,"acc":2.36899363083498,"operator":0.107464628571429,"boltech":0.2048198,"arAcc":1,"arBoltech":0.0508474576271186},"device":3,"acc":3,"operator":0,"boltech":0,"arAcc":0.2,"arBoltech":0,"store":"IBOX SOEKARNO HATTA MALANG"},{"name":"Gandi Wirapeta","target":{"device":140000000,"acc":6000000,"operator":2000000,"boltech":3500000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":32,"deviceVal":128019817,"accQty":40,"accVal":10227920,"operator":1586486,"boltechQty":4,"boltechVal":1428828,"arAcc":1.25,"arBoltech":0.125},"est":{"device":0.914427264285714,"acc":1.70465333333333,"operator":0.793243,"boltech":0.408236571428571,"arAcc":1.25,"arBoltech":0.125},"device":2,"acc":3,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0.5,"store":"ERAFONE KESAMBEN BLITAR"},{"name":"Keyzha Aprina Ferisca","target":{"device":274095974,"acc":13301561,"operator":4152236,"boltech":7080659,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":66,"deviceVal":329818020,"accQty":89,"accVal":11731794,"operator":5737746,"boltechQty":6,"boltechVal":2949548,"arAcc":1.34848484848485,"arBoltech":0.0909090909090909},"est":{"device":1.2032939236094,"acc":0.881986257101704,"operator":1.38184486623593,"boltech":0.416564051453403,"arAcc":1.34848484848485,"arBoltech":0.0909090909090909},"device":3,"acc":1.5,"operator":1,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE WLINGI BLITAR"},{"name":"Jonnathan Virgan Gunawan","target":{"device":108753064,"acc":5620173,"operator":1499001,"boltech":4063045,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":17,"deviceVal":99849550,"accQty":29,"accVal":8127747,"operator":450450,"boltechQty":1,"boltechVal":1125225,"arAcc":1.70588235294118,"arBoltech":0.0588235294117647},"est":{"device":0.918130913534537,"acc":1.44617380995211,"operator":0.300500133088637,"boltech":0.276941308796728,"arAcc":1.70588235294118,"arBoltech":0.0588235294117647},"device":2,"acc":3,"operator":0,"boltech":0,"arAcc":1,"arBoltech":0,"store":"ERAFONE MALL ARAYA MALANG"},{"name":"Deby Yulanda","target":{"device":140000000,"acc":6000000,"operator":2000000,"boltech":3500000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":31,"deviceVal":147602704,"accQty":51,"accVal":5316119,"operator":1766667,"boltechQty":2,"boltechVal":809009,"arAcc":1.64516129032258,"arBoltech":0.0645161290322581},"est":{"device":1.05430502857143,"acc":0.886019833333333,"operator":0.8833335,"boltech":0.231145428571429,"arAcc":1.64516129032258,"arBoltech":0.0645161290322581},"device":3,"acc":1.5,"operator":0.2,"boltech":0,"arAcc":1,"arBoltech":0,"store":"ERAFONE KESAMBEN BLITAR"},{"name":"Anis Maulidya","target":{"device":183400000,"acc":9300000,"operator":2800000,"boltech":2300000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":38,"deviceVal":229794593,"accQty":44,"accVal":8677747,"operator":2126126,"boltechQty":1,"boltechVal":269369,"arAcc":1.15789473684211,"arBoltech":0.0263157894736842},"est":{"device":1.25296942748092,"acc":0.933091075268817,"operator":0.759330714285714,"boltech":0.117116956521739,"arAcc":1.15789473684211,"arBoltech":0.0263157894736842},"device":3,"acc":2,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE RUKO A YANI MALANG"},{"name":"Sofi Aprilia Kusuma Ningrum","target":{"device":162855000,"acc":5198000,"operator":2865000,"boltech":2166000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":32,"deviceVal":151975676,"accQty":43,"accVal":5587928,"operator":2149550,"boltechQty":3,"boltechVal":898197,"arAcc":1.34375,"arBoltech":0.09375},"est":{"device":0.93319625433668,"acc":1.07501500577145,"operator":0.750279232111693,"boltech":0.414680055401662,"arAcc":1.34375,"arBoltech":0.09375},"device":2,"acc":3,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE RUKO DAMPIT"},{"name":"Fashna Salsaqila","target":{"device":101015016,"acc":6825545,"operator":1334173,"boltech":4554536,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":15,"deviceVal":88725227,"accQty":24,"accVal":5857020,"operator":1905405,"boltechQty":1,"boltechVal":179279,"arAcc":1.6,"arBoltech":0.0666666666666667},"est":{"device":0.87833700882649,"acc":0.858102906068307,"operator":1.42815436978563,"boltech":0.0393627364016883,"arAcc":1.6,"arBoltech":0.0666666666666667},"device":1.5,"acc":1.5,"operator":1,"boltech":0,"arAcc":1,"arBoltech":0,"store":"ERAFONE LIPPO PLAZA BATU"},{"name":"Nelafi Aulia Faza","target":{"device":300000000,"acc":12707185,"operator":3000000,"boltech":12000000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":29,"deviceVal":163856756,"accQty":55,"accVal":12949635,"operator":3721621,"boltechQty":2,"boltechVal":1079280,"arAcc":1.89655172413793,"arBoltech":0.0689655172413793},"est":{"device":0.546189186666667,"acc":1.01907975684623,"operator":1.24054033333333,"boltech":0.08994,"arAcc":1.89655172413793,"arBoltech":0.0689655172413793},"device":0,"acc":3,"operator":1,"boltech":0,"arAcc":1,"arBoltech":0,"store":"ERAFONE MAL OLYMPIC GARDEN"},{"name":"Dian Angga Pratama","target":{"device":274095974,"acc":13301561,"operator":4152236,"boltech":7080659,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":68,"deviceVal":329992794,"accQty":91,"accVal":10767833,"operator":6095312,"boltechQty":8,"boltechVal":2515312,"arAcc":1.33823529411765,"arBoltech":0.117647058823529},"est":{"device":1.20393156157777,"acc":0.809516492086906,"operator":1.46795895031015,"boltech":0.355236991359138,"arAcc":1.33823529411765,"arBoltech":0.117647058823529},"device":3,"acc":0,"operator":1,"boltech":0,"arAcc":0.5,"arBoltech":0.2,"store":"ERAFONE WLINGI BLITAR"},{"name":"Mahirti Johar","target":{"device":101015016,"acc":6825545,"operator":1334173,"boltech":4554536,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":16,"deviceVal":161877477,"accQty":26,"accVal":5481349,"operator":450450,"boltechQty":2,"boltechVal":2250450,"arAcc":1.625,"arBoltech":0.125},"est":{"device":1.6025090467738,"acc":0.803063931158611,"operator":0.337624880731359,"boltech":0.494111804144264,"arAcc":1.625,"arBoltech":0.125},"device":3,"acc":0,"operator":0,"boltech":0,"arAcc":1,"arBoltech":0.5,"store":"ERAFONE LIPPO PLAZA BATU"},{"name":"Eka Abdullah Effendy","target":{"device":320000000,"acc":12707185,"operator":3000000,"boltech":10000000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":39,"deviceVal":237613520,"accQty":52,"accVal":12134312,"operator":3419820,"boltechQty":1,"boltechVal":269369,"arAcc":1.33333333333333,"arBoltech":0.0256410256410256},"est":{"device":0.74254225,"acc":0.954917395158723,"operator":1.13994,"boltech":0.0269369,"arAcc":1.33333333333333,"arBoltech":0.0256410256410256},"device":0,"acc":3,"operator":1,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE MAL OLYMPIC GARDEN"},{"name":"Akbar Syaihidillah Afzy","target":{"device":190000000,"acc":75000000,"operator":5500000,"boltech":5500000,"arAcc":2,"arBoltech":0.15},"ach":{"deviceQty":42,"deviceVal":200863069,"accQty":96,"accVal":49162068,"operator":1833333,"boltechQty":1,"boltechVal":629730,"arAcc":2.28571428571429,"arBoltech":0.0238095238095238},"est":{"device":1.05717404736842,"acc":0.65549424,"operator":0.333333272727273,"boltech":0.114496363636364,"arAcc":2.28571428571429,"arBoltech":0.0238095238095238},"device":3,"acc":0,"operator":0,"boltech":0,"arAcc":1,"arBoltech":0,"store":"XIAOMI STORE MAL OLYMPIC GARDEN"},{"name":"Vikry Zamzany Nugraha","target":{"device":200000000,"acc":9000000,"operator":4000000,"boltech":7000000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":26,"deviceVal":155074775,"accQty":38,"accVal":9815852,"operator":2518918,"boltechQty":3,"boltechVal":1258558,"arAcc":1.46153846153846,"arBoltech":0.115384615384615},"est":{"device":0.775373875,"acc":1.09065022222222,"operator":0.6297295,"boltech":0.179794,"arAcc":1.46153846153846,"arBoltech":0.115384615384615},"device":0,"acc":3,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0.2,"store":"ERAFONE & MORE SAWOJAJAR MALANG"},{"name":"Delvi Nurhayati","target":{"device":125175038,"acc":5800642,"operator":2067960,"boltech":2280885,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":35,"deviceVal":137806306,"accQty":36,"accVal":4121028,"operator":1856755,"boltechQty":2,"boltechVal":989189,"arAcc":1.02857142857143,"arBoltech":0.0571428571428571},"est":{"device":1.10090884094639,"acc":0.710443430227206,"operator":0.897867947155651,"boltech":0.433686485728127,"arAcc":1.02857142857143,"arBoltech":0.0571428571428571},"device":3,"acc":0,"operator":0.2,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE RUKO TUREN MALANG"},{"name":"Roicha Firdaus","target":{"device":140000000,"acc":6000000,"operator":2000000,"boltech":3500000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":30,"deviceVal":137062160,"accQty":41,"accVal":4904050,"operator":1226126,"boltechQty":1,"boltechVal":359459,"arAcc":1.36666666666667,"arBoltech":0.0333333333333333},"est":{"device":0.979015428571429,"acc":0.817341666666667,"operator":0.613063,"boltech":0.102702571428571,"arAcc":1.36666666666667,"arBoltech":0.0333333333333333},"device":3,"acc":0,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE KESAMBEN BLITAR"},{"name":"Bustantheo Firdaus Mustaghfirin","target":{"device":100000000,"acc":6000000,"operator":1500000,"boltech":2550000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":11,"deviceVal":100575678,"accQty":15,"accVal":1969188,"operator":405405,"boltechQty":1,"boltechVal":179279,"arAcc":1.36363636363636,"arBoltech":0.0909090909090909},"est":{"device":1.00575678,"acc":0.328198,"operator":0.27027,"boltech":0.0703054901960784,"arAcc":1.36363636363636,"arBoltech":0.0909090909090909},"device":3,"acc":0,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE & MORE TLOGOMAS MALANG"},{"name":"Wahyu Melati","target":{"device":125175038,"acc":5800642,"operator":2067960,"boltech":2280885,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":33,"deviceVal":175465766,"accQty":36,"accVal":3227292,"operator":1531531,"boltechQty":2,"boltechVal":718919,"arAcc":1.09090909090909,"arBoltech":0.0606060606060606},"est":{"device":1.4017632333373,"acc":0.556368070982488,"operator":0.740599914891971,"boltech":0.315193006223462,"arAcc":1.09090909090909,"arBoltech":0.0606060606060606},"device":3,"acc":0,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE RUKO TUREN MALANG"},{"name":"Vina Ismatul Maula","target":{"device":414414000,"acc":27027000,"operator":3603603,"boltech":10810810,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":72,"deviceVal":408597301,"accQty":75,"accVal":17181708,"operator":2411711,"boltechQty":5,"boltechVal":1346845,"arAcc":1.04166666666667,"arBoltech":0.0694444444444444},"est":{"device":0.985964038377082,"acc":0.635723831723832,"operator":0.669249914599361,"boltech":0.124583171843738,"arAcc":1.04166666666667,"arBoltech":0.0694444444444444},"device":3,"acc":0,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE RUKO BLITAR"},{"name":"Devi Agustin Yuliyanti","target":{"device":414414000,"acc":27027000,"operator":3603603,"boltech":10810810,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":76,"deviceVal":495535137,"accQty":99,"accVal":21302781,"operator":2411713,"boltechQty":2,"boltechVal":628828,"arAcc":1.30263157894737,"arBoltech":0.0263157894736842},"est":{"device":1.19574902633598,"acc":0.788203685203685,"operator":0.669250469599454,"boltech":0.0581665943624946,"arAcc":1.30263157894737,"arBoltech":0.0263157894736842},"device":3,"acc":0,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE RUKO BLITAR"},{"name":"Muhamad Huanka Alifiansyah Frediawan","target":{"device":200000000,"acc":60000000,"operator":5500000,"boltech":5000000,"arAcc":2,"arBoltech":0.15},"ach":{"deviceQty":46,"deviceVal":220679283,"accQty":71,"accVal":40885409,"operator":3208108,"boltechQty":3,"boltechVal":1420721,"arAcc":1.54347826086957,"arBoltech":0.0652173913043478},"est":{"device":1.103396415,"acc":0.681423483333333,"operator":0.583292363636364,"boltech":0.2841442,"arAcc":1.54347826086957,"arBoltech":0.0652173913043478},"device":3,"acc":0,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"XIAOMI STORE MAL OLYMPIC GARDEN"},{"name":"Hansah Saiful Huda","target":{"device":215000000,"acc":75000000,"operator":5500000,"boltech":5500000,"arAcc":2,"arBoltech":0.15},"ach":{"deviceQty":54,"deviceVal":232996397,"accQty":96,"accVal":49299011,"operator":2018019,"boltechQty":4,"boltechVal":2122523,"arAcc":1.77777777777778,"arBoltech":0.0740740740740741},"est":{"device":1.08370417209302,"acc":0.657320146666667,"operator":0.366912545454545,"boltech":0.385913272727273,"arAcc":1.77777777777778,"arBoltech":0.0740740740740741},"device":3,"acc":0,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"XIAOMI STORE MAL OLYMPIC GARDEN"},{"name":"Wahyu Wardana","target":{"device":414414000,"acc":27027000,"operator":3603603,"boltech":10810810,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":88,"deviceVal":405388288,"accQty":95,"accVal":15435486,"operator":1766667,"boltechQty":1,"boltechVal":269369,"arAcc":1.07954545454545,"arBoltech":0.0113636363636364},"est":{"device":0.978220542742282,"acc":0.571113553113553,"operator":0.490250174616904,"boltech":0.0249166343687476,"arAcc":1.07954545454545,"arBoltech":0.0113636363636364},"device":3,"acc":0,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE RUKO BLITAR"},{"name":"Viona Hatvilillah","target":{"device":133235564,"acc":5975952,"operator":3735810,"boltech":4035464,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":29,"deviceVal":131595495,"accQty":21,"accVal":1750000,"operator":3288288,"boltechQty":3,"boltechVal":1934234,"arAcc":0.724137931034483,"arBoltech":0.103448275862069},"est":{"device":0.987690456280877,"acc":0.292840370873126,"operator":0.880207505199676,"boltech":0.479308946876989,"arAcc":0.724137931034483,"arBoltech":0.103448275862069},"device":3,"acc":0,"operator":0.2,"boltech":0,"arAcc":0,"arBoltech":0.2,"store":"ERAFONE RUKO PAKIS MALANG"},{"name":"Dimas Ananda Saputra","target":{"device":162855000,"acc":5198000,"operator":2865000,"boltech":2166000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":19,"deviceVal":105352252,"accQty":27,"accVal":4725852,"operator":2014414,"boltechQty":3,"boltechVal":1078378,"arAcc":1.42105263157895,"arBoltech":0.157894736842105},"est":{"device":0.646908304933837,"acc":0.909167372066179,"operator":0.703111343804538,"boltech":0.497866112650046,"arAcc":1.42105263157895,"arBoltech":0.157894736842105},"device":0,"acc":1.5,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":1,"store":"ERAFONE RUKO DAMPIT"},{"name":"Atrisa Diasetyani","target":{"device":200000000,"acc":65000000,"operator":5500000,"boltech":5500000,"arAcc":2,"arBoltech":0.15},"ach":{"deviceQty":43,"deviceVal":186672975,"accQty":66,"accVal":38464772,"operator":2417117,"boltechQty":3,"boltechVal":1042342,"arAcc":1.53488372093023,"arBoltech":0.0697674418604651},"est":{"device":0.933364875,"acc":0.591765723076923,"operator":0.439475818181818,"boltech":0.189516727272727,"arAcc":1.53488372093023,"arBoltech":0.0697674418604651},"device":2,"acc":0,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"XIAOMI STORE MAL OLYMPIC GARDEN"},{"name":"Darmawan Romadhan","target":{"device":101015016,"acc":6825545,"operator":1334173,"boltech":4554536,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":15,"deviceVal":74004506,"accQty":25,"accVal":5866035,"operator":450450,"boltechQty":1,"boltechVal":629730,"arAcc":1.66666666666667,"arBoltech":0.0666666666666667},"est":{"device":0.732608961820092,"acc":0.859423679720813,"operator":0.337624880731359,"boltech":0.138264358872122,"arAcc":1.66666666666667,"arBoltech":0.0666666666666667},"device":0,"acc":1.5,"operator":0,"boltech":0,"arAcc":1,"arBoltech":0,"store":"ERAFONE LIPPO PLAZA BATU"},{"name":"Didik Priyantoro","target":{"device":100000000,"acc":6000000,"operator":1500000,"boltech":2550000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":14,"deviceVal":62194593,"accQty":21,"accVal":2295857,"operator":3360360,"boltechQty":0,"boltechVal":0,"arAcc":1.5,"arBoltech":0},"est":{"device":0.62194593,"acc":0.382642833333333,"operator":2.24024,"boltech":0,"arAcc":1.5,"arBoltech":0},"device":0,"acc":0,"operator":1,"boltech":0,"arAcc":1,"arBoltech":0,"store":"ERAFONE & MORE TLOGOMAS MALANG"},{"name":"Nikki Nur Hidayat","target":{"device":133235564,"acc":5975952,"operator":3735810,"boltech":4035464,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":27,"deviceVal":112723422,"accQty":27,"accVal":1496127,"operator":4072972,"boltechQty":3,"boltechVal":988288,"arAcc":1,"arBoltech":0.111111111111111},"est":{"device":0.846046045183552,"acc":0.250357934601884,"operator":1.09025137788057,"boltech":0.244900710302458,"arAcc":1,"arBoltech":0.111111111111111},"device":0,"acc":0,"operator":1,"boltech":0,"arAcc":0.5,"arBoltech":0.2,"store":"ERAFONE RUKO PAKIS MALANG"},{"name":"Amelia Agil Anggitarani","target":{"device":100000000,"acc":6000000,"operator":1500000,"boltech":2550000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":21,"deviceVal":81386486,"accQty":22,"accVal":3393513,"operator":1486486,"boltechQty":1,"boltechVal":179279,"arAcc":1.04761904761905,"arBoltech":0.0476190476190476},"est":{"device":0.81386486,"acc":0.5655855,"operator":0.990990666666667,"boltech":0.0703054901960784,"arAcc":1.04761904761905,"arBoltech":0.0476190476190476},"device":0,"acc":0,"operator":1,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE & MORE TLOGOMAS MALANG"},{"name":"Wenike Kresta Diva","target":{"device":183400000,"acc":9300000,"operator":2800000,"boltech":2300000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":31,"deviceVal":151332431,"accQty":45,"accVal":6617559,"operator":3229728,"boltechQty":1,"boltechVal":359459,"arAcc":1.45161290322581,"arBoltech":0.032258064516129},"est":{"device":0.825149569247546,"acc":0.711565483870968,"operator":1.15347428571429,"boltech":0.15628652173913,"arAcc":1.45161290322581,"arBoltech":0.032258064516129},"device":0,"acc":0,"operator":1,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE RUKO A YANI MALANG"},{"name":"Alifi Saputra","target":{"device":350000000,"acc":12707185,"operator":3000000,"boltech":12000000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":42,"deviceVal":258818018,"accQty":37,"accVal":7879906,"operator":4974776,"boltechQty":1,"boltechVal":1125225,"arAcc":0.880952380952381,"arBoltech":0.0238095238095238},"est":{"device":0.739480051428571,"acc":0.620114210975916,"operator":1.65825866666667,"boltech":0.09376875,"arAcc":0.880952380952381,"arBoltech":0.0238095238095238},"device":0,"acc":0,"operator":1,"boltech":0,"arAcc":0.2,"arBoltech":0,"store":"ERAFONE MAL OLYMPIC GARDEN"},{"name":"Arik Pandika","target":{"device":200000000,"acc":9000000,"operator":4000000,"boltech":7000000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":31,"deviceVal":131273875,"accQty":44,"accVal":4853243,"operator":3782882,"boltechQty":3,"boltechVal":988288,"arAcc":1.41935483870968,"arBoltech":0.0967741935483871},"est":{"device":0.656369375,"acc":0.539249222222222,"operator":0.9457205,"boltech":0.141184,"arAcc":1.41935483870968,"arBoltech":0.0967741935483871},"device":0,"acc":0,"operator":0.5,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE & MORE SAWOJAJAR MALANG"},{"name":"Wahyu Eko Prasetyo","target":{"device":181500000,"acc":10000000,"operator":6000000,"boltech":5000000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":29,"deviceVal":141460359,"accQty":46,"accVal":7113960,"operator":2445946,"boltechQty":0,"boltechVal":0,"arAcc":1.58620689655172,"arBoltech":0},"est":{"device":0.779395917355372,"acc":0.711396,"operator":0.407657666666667,"boltech":0,"arAcc":1.58620689655172,"arBoltech":0},"device":0,"acc":0,"operator":0,"boltech":0,"arAcc":1,"arBoltech":0,"store":"ERAFONE & MORE TUMENGGUNG SURYO"},{"name":"Muhammad Zallum","target":{"device":125175038,"acc":5800642,"operator":2067960,"boltech":2280885,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":23,"deviceVal":103951353,"accQty":30,"accVal":2263964,"operator":1475675,"boltechQty":0,"boltechVal":0,"arAcc":1.30434782608696,"arBoltech":0},"est":{"device":0.830447944421635,"acc":0.390295419024308,"operator":0.713589721271204,"boltech":0,"arAcc":1.30434782608696,"arBoltech":0},"device":0,"acc":0,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE RUKO TUREN MALANG"},{"name":"Mario Ady Cahyono","target":{"device":183400000,"acc":9300000,"operator":2800000,"boltech":2300000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":23,"deviceVal":97961263,"accQty":30,"accVal":4231267,"operator":1531531,"boltechQty":1,"boltechVal":629730,"arAcc":1.30434782608696,"arBoltech":0.0434782608695652},"est":{"device":0.534139929116685,"acc":0.454974946236559,"operator":0.546975357142857,"boltech":0.273795652173913,"arAcc":1.30434782608696,"arBoltech":0.0434782608695652},"device":0,"acc":0,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE RUKO A YANI MALANG"},{"name":"Mohamad Fahriza","target":{"device":125175038,"acc":5800642,"operator":2067960,"boltech":2280885,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":19,"deviceVal":74897296,"accQty":26,"accVal":3086933,"operator":900900,"boltechQty":0,"boltechVal":0,"arAcc":1.36842105263158,"arBoltech":0},"est":{"device":0.598340509391337,"acc":0.532170921770383,"operator":0.435646724308014,"boltech":0,"arAcc":1.36842105263158,"arBoltech":0},"device":0,"acc":0,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE RUKO TUREN MALANG"},{"name":"Khilma Mahirotun Nadzifah","target":{"device":215000000,"acc":60000000,"operator":5500000,"boltech":5500000,"arAcc":2,"arBoltech":0.15},"ach":{"deviceQty":26,"deviceVal":106958558,"accQty":43,"accVal":25609915,"operator":2324323,"boltechQty":1,"boltechVal":503604,"arAcc":1.65384615384615,"arBoltech":0.0384615384615385},"est":{"device":0.497481665116279,"acc":0.426831916666667,"operator":0.422604181818182,"boltech":0.0915643636363636,"arAcc":1.65384615384615,"arBoltech":0.0384615384615385},"device":0,"acc":0,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"XIAOMI STORE MAL OLYMPIC GARDEN"},{"name":"Novi Vitri Aningtiyas","target":{"device":162855000,"acc":5198000,"operator":2865000,"boltech":2166000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":25,"deviceVal":128850451,"accQty":25,"accVal":3290269,"operator":1766667,"boltechQty":2,"boltechVal":628828,"arAcc":1,"arBoltech":0.08},"est":{"device":0.791197390316539,"acc":0.632987495190458,"operator":0.616637696335079,"boltech":0.290317636195753,"arAcc":1,"arBoltech":0.08},"device":0,"acc":0,"operator":0,"boltech":0,"arAcc":0.5,"arBoltech":0,"store":"ERAFONE RUKO DAMPIT"},{"name":"Putri Wahyu Wardhani","target":{"device":200000000,"acc":12707185,"operator":3000000,"boltech":4000000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":32,"deviceVal":125556757,"accQty":28,"accVal":5745943,"operator":1081081,"boltechQty":1,"boltechVal":449550,"arAcc":0.875,"arBoltech":0.03125},"est":{"device":0.627783785,"acc":0.452180636387996,"operator":0.360360333333333,"boltech":0.1123875,"arAcc":0.875,"arBoltech":0.03125},"device":0,"acc":0,"operator":0,"boltech":0,"arAcc":0.2,"arBoltech":0,"store":"ERAFONE MAL OLYMPIC GARDEN"},{"name":"Ilfan Donny Arifianto","target":{"device":183400000,"acc":9300000,"operator":2800000,"boltech":2300000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":31,"deviceVal":123065769,"accQty":26,"accVal":3124862,"operator":1361260,"boltechQty":1,"boltechVal":359459,"arAcc":0.838709677419355,"arBoltech":0.032258064516129},"est":{"device":0.671023822246456,"acc":0.336006666666667,"operator":0.486164285714286,"boltech":0.15628652173913,"arAcc":0.838709677419355,"arBoltech":0.032258064516129},"device":0,"acc":0,"operator":0,"boltech":0,"arAcc":0.2,"arBoltech":0,"store":"ERAFONE RUKO A YANI MALANG"},{"name":"Dava Afif Kamaludin","target":{"device":330000000,"acc":12707185,"operator":3000000,"boltech":10000000,"arAcc":1.5,"arBoltech":0.15},"ach":{"deviceQty":42,"deviceVal":230186490,"accQty":30,"accVal":4522968,"operator":2271171,"boltechQty":4,"boltechVal":3509909,"arAcc":0.714285714285714,"arBoltech":0.0952380952380952},"est":{"device":0.697534818181818,"acc":0.355937841465281,"operator":0.757057,"boltech":0.3509909,"arAcc":0.714285714285714,"arBoltech":0.0952380952380952},"device":0,"acc":0,"operator":0,"boltech":0,"arAcc":0,"arBoltech":0,"store":"ERAFONE MAL OLYMPIC GARDEN"}];

function calcTotal(r){ return fields.reduce((s,f)=>s+(parseFloat(r[f])||0),0); }
function calcGrade(total){
  if(total >= 10) return 'Perfect';
  if(total >= 8) return 'Good';
  if(total >= 5) return 'Need Improve';
  if(total >= 3) return 'Bad';
  return 'Poor';
}
function gradeClass(grade){ return grade.toLowerCase().replace(/\s+/g,''); }
function initials(name){ return name.trim().split(/\s+/).slice(0,2).map(w=>w[0]).join('').toUpperCase(); }
let filterStore = '';
let filterGrade = '';
let searchName = '';
let dateFrom = '';
let dateTo = '';
let filteredHistoryData = [];
function onFilterChange(){
  filterStore = document.getElementById('filterStore').value;
  filterGrade = document.getElementById('filterGrade').value;
  searchName = (document.getElementById('searchName')?.value || '').trim().toLowerCase();
  render();
}
function resetFilters(){
  filterStore = ''; filterGrade = ''; searchName = '';
  document.getElementById('filterStore').value = '';
  document.getElementById('filterGrade').value = '';
  if(document.getElementById('searchName')) document.getElementById('searchName').value = '';
  render();
}
function populateStoreOptions(ranked){
  const sel = document.getElementById('filterStore');
  if(!sel) return;
  const stores = [...new Set(ranked.map(r=>r.store).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
  const current = sel.value;
  sel.innerHTML = '<option value="">Semua Store</option>' + stores.map(s=>`<option value="${escapeAttr(s)}">${escapeHtml(s)}</option>`).join('');
  sel.value = stores.includes(current) ? current : '';
}
function rankDeltaHtml(prevRank, currentRank){
  if(prevRank===null || prevRank===undefined || isNaN(prevRank)) return '<span class="rank-delta new">Baru</span>';
  const delta = prevRank - currentRank;
  if(delta > 0) return `<span class="rank-delta up"><i class="ti ti-arrow-narrow-up"></i>${delta}</span>`;
  if(delta < 0) return `<span class="rank-delta down"><i class="ti ti-arrow-narrow-down"></i>${Math.abs(delta)}</span>`;
  return `<span class="rank-delta same"><i class="ti ti-minus"></i></span>`;
}

const SUPABASE_URL = 'https://bxdjuyixhqgsleyuwvml.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_YZ2TegOjMOcXRFbw2Awbhw_cdpBG7w8';
const SUPABASE_READY = !SUPABASE_URL.includes('PASTE_') && !SUPABASE_ANON_KEY.includes('PASTE_');
const sb = SUPABASE_READY ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
let isAdmin=false, currentUser=null, saveTimer=null;

const ADMIN_EMAILS = ['hafiztsyakir@gmail.com'].map(e=>e.trim().toLowerCase());
function isAdminFromUser(user){
  return !!user && ADMIN_EMAILS.includes((user.email||'').toLowerCase());
}
function syncMessage(msg,ok=true){const el=document.getElementById('syncStatus');if(!el)return;el.textContent=msg||'';el.className='upload-status '+(ok?'ok':'err');}
function updateAdminUI(){document.getElementById('adminPanel').style.display=isAdmin?'block':'none';document.getElementById('adminBtnLabel').textContent=isAdmin?'Logout':'Login Admin';const badge=document.getElementById('modeBadge');badge.textContent=isAdmin?'Mode admin':'Mode lihat saja';badge.className='mode-badge '+(isAdmin?'admin':'view');const navSettings=document.getElementById('navSettings');if(navSettings){navSettings.style.display=isAdmin?'flex':'none';if(!isAdmin&&currentView==='settings')switchView('dashboard');}updateSnapshotReminder();}
let currentView='dashboard';
function switchView(view){
  currentView=view;
  document.querySelectorAll('.nav-item').forEach(btn=>btn.classList.toggle('active',btn.dataset.view===view));
  document.querySelectorAll('.view-section').forEach(sec=>sec.classList.toggle('active',sec.dataset.viewSection===view));
  window.scrollTo({top:0,behavior:'instant'});
  if(view==='compare') renderCompareView();
}
async function loadAdminState(){
  if(!SUPABASE_READY){isAdmin=false;updateAdminUI();syncMessage('Supabase belum dikonfigurasi. Isi SUPABASE_URL dan SUPABASE_ANON_KEY di index.html.',false);return;}
  const {data:{session}}=await sb.auth.getSession();currentUser=session?.user||null;isAdmin=isAdminFromUser(currentUser);updateAdminUI();
  if(isAdmin)syncMessage('Login admin aktif: '+(currentUser.email||'akun admin'));
}
async function toggleAdmin(){
  if(!SUPABASE_READY){alert('Dashboard belum dikonfigurasi ke Supabase. Ikuti PETUNJUK-GITHUB-PAGES-SUPABASE.md.');return;}
  if(isAdmin){if(!confirm('Keluar dari mode admin? Anda perlu login ulang untuk membuka dashboard lagi.'))return;await sb.auth.signOut();location.reload();return;}
  const email=prompt('Email admin Supabase:');if(email===null)return;const password=prompt('Password admin:');if(password===null)return;
  const {data,error}=await sb.auth.signInWithPassword({email:email.trim(),password});if(error){alert('Login gagal: '+error.message);return;}
  currentUser=data.user;isAdmin=isAdminFromUser(currentUser);updateAdminUI();render();syncMessage(isAdmin?'Login admin berhasil.':'Login berhasil (mode lihat saja — email ini tidak terdaftar sebagai admin).');
}
function normalizeRows(value){
  if(!Array.isArray(value))return[];
  return value.map(r=>({
    name:String(r.name??''),
    device:parseFloat(r.device)||0,acc:parseFloat(r.acc)||0,operator:parseFloat(r.operator)||0,
    boltech:parseFloat(r.boltech)||0,arAcc:parseFloat(r.arAcc)||0,arBoltech:parseFloat(r.arBoltech)||0,
    store:String(r.store??''),
    prevRank:(r.prevRank===null||r.prevRank===undefined)?null:parseInt(r.prevRank),
    active:r.active!==false,
    target:r.target||{}, ach:r.ach||{}, est:r.est||{}
  }));
}

function isActive(r){ return r.active !== false; }
function getUploadMode(){ return document.querySelector('input[name="uploadMode"]:checked')?.value || 'current'; }
function updateUploadModeUI(){
  const archive = getUploadMode()==='archive';
  const card=document.getElementById('archiveMonthCard'); if(card) card.style.display=archive?'block':'none';
  const dcard=document.getElementById('customDateCard'); if(dcard) dcard.style.display=archive?'none':'block';
  const zone=document.getElementById('dropZone'); if(zone) zone.querySelector('.main-txt').textContent=archive?'Upload Excel Bulan Sebelumnya':'Upload Excel Data Berjalan';
}
function monthLabel(monthKey){
  if(!monthKey)return '-';
  const d=new Date(monthKey+'-01T00:00:00');
  return d.toLocaleDateString('id-ID',{month:'long',year:'numeric'});
}
function archiveMonthFromSnapshot(h){
  const f=String(h?.file_name||'');
  const m=f.match(/^ARCHIVE_MONTH:(\d{4}-\d{2})\|/);
  return m?m[1]:'';
}
function fmtValueShort(v){
  const n=Number(v||0)/1000;
  return n.toLocaleString('id-ID',{minimumFractionDigits:0,maximumFractionDigits:1});
}
function fmtRatio(v){
  const n=Number(v||0);
  return n.toLocaleString('id-ID',{minimumFractionDigits:0,maximumFractionDigits:2});
}
function fmtTarget(t){
  if(!t)return '-';
  return `Device ${fmtValueShort(t.device)} · Acc ${fmtValueShort(t.acc)} · Op ${fmtValueShort(t.operator)} · Boltech ${fmtValueShort(t.boltech)} · AR Acc ${fmtRatio(t.arAcc)} · AR Boltech ${fmtRatio(t.arBoltech)}`;
}
function fmtAchievement(a){
  if(!a)return '-';
  return `Device ${fmtValueShort(a.deviceVal)} · Acc ${fmtValueShort(a.accVal)} · Op ${fmtValueShort(a.operator)} · Boltech ${fmtValueShort(a.boltechVal)} · AR Acc ${fmtRatio(a.arAcc)} · AR Boltech ${fmtRatio(a.arBoltech)}`;
}
function fmtTargetAchPoint(row){
  return `<div class="tap-wrap"><div><span class="tap-label ach-label">Ach</span> ${escapeHtml(fmtAchievement(row.ach))}</div><div><span class="tap-label point-label">Point</span> <b>${Number(row.total||0).toFixed(2)}</b></div></div>`;
}
function buildDataMeta(row){
  return {target:row.target||{},ach:row.ach||{},est:row.est||{},device:row.device,acc:row.acc,operator:row.operator,boltech:row.boltech,arAcc:row.arAcc,arBoltech:row.arBoltech,store:row.store||'',active:row.active!==false};
}
function getRankedRows(source=rows){
  return source.filter(isActive).map((r,i)=>({...r,total:calcTotal(r)})).sort((a,b)=>b.total-a.total).map((r,i)=>({...r,rank:i+1}));
}
async function loadData(){
  if(!SUPABASE_READY){rows=SEED.slice();lastUpdateLabel='Data awal (belum tersambung server)';render();return;}
  const {data,error}=await sb.from('dashboard_state').select('rows,last_update').eq('id',1).maybeSingle();
  if(error){console.error(error);rows=SEED.slice();lastUpdateLabel='Gagal membaca server';syncMessage('Gagal membaca data pusat: '+error.message,false);render();return;}
  if(data&&Array.isArray(data.rows)&&data.rows.length){rows=normalizeRows(data.rows);lastUpdateLabel=data.last_update||'';}else{rows=SEED.slice();lastUpdateLabel='Data contoh bawaan HTML';}
  render();
}
async function persist(){
  if(!SUPABASE_READY){syncMessage('Belum tersambung ke server pusat.',false);return false;}
  if(!isAdmin){syncMessage('Hanya admin yang boleh menyimpan perubahan.',false);return false;}
  const payload={id:1,rows,last_update:lastUpdateLabel,updated_by:currentUser?.email||null,updated_at:new Date().toISOString()};
  const {error}=await sb.from('dashboard_state').upsert(payload,{onConflict:'id'});
  if(error){console.error(error);syncMessage('Gagal menyimpan ke server pusat: '+error.message,false);return false;}
  syncMessage('✓ Data tersimpan di server pusat. Semua perangkat akan melihat data terbaru.');return true;
}
function schedulePersist(){clearTimeout(saveTimer);saveTimer=setTimeout(()=>persist(),350);}
function setStatus(msg,ok){const el=document.getElementById('uploadStatus');el.textContent=msg;el.className='upload-status '+(ok?'ok':'err');}
function handleFile(file){
  if(!isAdmin){alert('Login admin terlebih dahulu.');return;} if(!file)return;
  const reader=new FileReader();reader.onload=async function(e){try{
    const data=new Uint8Array(e.target.result),wb=XLSX.read(data,{type:'array'}),sheet=wb.Sheets[wb.SheetNames[0]],grid=XLSX.utils.sheet_to_json(sheet,{header:1,defval:null,raw:true});
    let headerRowIdx=-1,totalColIdx=-1;
    for(let i=0;i<grid.length;i++){const idx=grid[i].findIndex(c=>typeof c==='string'&&c.trim().toLowerCase()==='total point');if(idx>-1){headerRowIdx=i;totalColIdx=idx;break;}}
    if(headerRowIdx===-1)throw new Error('Kolom "Total Point" tidak ditemukan.');
    const newRows=[];
    const oldByName={}; rows.forEach(r=>oldByName[r.name]=r);
    for(let i=headerRowIdx+1;i<grid.length;i++){
      const r=grid[i]; if(!r||r[0]==null||typeof r[0]!=='string'||r[0].trim()==='')continue;
      const total=parseFloat(r[totalColIdx]); if(isNaN(total))continue;
      const nm=String(r[0]).trim();
      const old=oldByName[nm];
      newRows.push({
        name:nm,
        target:{device:parseFloat(r[totalColIdx-27])||0,acc:parseFloat(r[totalColIdx-26])||0,operator:parseFloat(r[totalColIdx-25])||0,boltech:parseFloat(r[totalColIdx-24])||0,arAcc:parseFloat(r[totalColIdx-23])||0,arBoltech:parseFloat(r[totalColIdx-22])||0},
        ach:{deviceQty:parseFloat(r[totalColIdx-21])||0,deviceVal:parseFloat(r[totalColIdx-20])||0,accQty:parseFloat(r[totalColIdx-19])||0,accVal:parseFloat(r[totalColIdx-18])||0,operator:parseFloat(r[totalColIdx-17])||0,boltechQty:parseFloat(r[totalColIdx-16])||0,boltechVal:parseFloat(r[totalColIdx-15])||0,arAcc:parseFloat(r[totalColIdx-14])||0,arBoltech:parseFloat(r[totalColIdx-13])||0},
        est:{device:parseFloat(r[totalColIdx-12])||0,acc:parseFloat(r[totalColIdx-11])||0,operator:parseFloat(r[totalColIdx-10])||0,boltech:parseFloat(r[totalColIdx-9])||0,arAcc:parseFloat(r[totalColIdx-8])||0,arBoltech:parseFloat(r[totalColIdx-7])||0},
        device:parseFloat(r[totalColIdx-6])||0,acc:parseFloat(r[totalColIdx-5])||0,operator:parseFloat(r[totalColIdx-4])||0,boltech:parseFloat(r[totalColIdx-3])||0,arAcc:parseFloat(r[totalColIdx-2])||0,arBoltech:parseFloat(r[totalColIdx-1])||0,
        store:r[totalColIdx+2]?String(r[totalColIdx+2]).trim():'',
        active:old ? old.active!==false : true,
        prevRank:null
      });
    }
    if(newRows.length===0)throw new Error('Tidak ada baris data yang bisa dibaca dari file ini.');
    const mode=getUploadMode();
    if(mode==='archive'){
      const month=document.getElementById('archiveMonth')?.value;
      if(!month)throw new Error('Pilih bulan arsip terlebih dahulu.');
      const wt=newRows.map(r=>({...r,total:calcTotal(r)})).filter(isActive);
      const sorted=wt.slice().sort((a,b)=>b.total-a.total);
      const snapRows=sorted.map((r,i)=>({...buildDataMeta(r),name:r.name,total:Math.round(r.total*100)/100,grade:calcGrade(r.total),rank:i+1}));
      const archiveLabel=`Arsip ${monthLabel(month)}`;
      const avg=wt.length?wt.reduce((s,r)=>s+r.total,0)/wt.length:0;
      const [archY,archM]=month.split('-').map(Number);
      const lastDayOfMonth=new Date(archY,archM,0).getDate();
      const archiveDate=new Date(archY,archM-1,lastDayOfMonth,12,0,0);
      const item={label:archiveLabel,date:archiveDate.toISOString(),avg:Math.round(avg*100)/100,
        top:sorted[0]?.name||'-',top_pt:sorted[0]?.total||0,bottom:sorted[sorted.length-1]?.name||'-',bottom_pt:sorted[sorted.length-1]?.total||0,
        count:wt.length,rows_snapshot:snapRows,file_name:`ARCHIVE_MONTH:${month}|${file.name}`,uploaded_by:currentUser?.email||'Admin'};
      const result=await insertHistoryWithFallback(item);
      if(!result.ok)throw new Error(result.message);
      await loadHistory(); renderMonthlyCompare();
      setStatus(`✓ Arsip ${monthLabel(month)} tersimpan. Data berjalan tidak berubah.`,true);
    } else {
      const beforeRank=getRankedRows(rows); const prevMap={};beforeRank.forEach(r=>prevMap[r.name]=r.rank);
      newRows.forEach(r=>r.prevRank=Object.prototype.hasOwnProperty.call(prevMap,r.name)?prevMap[r.name]:null);
      rows=newRows;
      const customDateVal=document.getElementById('customSnapshotDate')?.value||'';
      const isBackfill=!!customDateVal;
      const snapDate=isBackfill ? new Date(customDateVal+'T12:00:00') : new Date();
      lastUpdateLabel=isBackfill ? snapDate.toLocaleDateString('id-ID',{dateStyle:'medium'})+' (susulan, diinput '+new Date().toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'})+')' : snapDate.toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'});
      await persist(); render();
      const newWithTotal=newRows.map(r=>({name:r.name,total:calcTotal(r),store:r.store}));
      const newFingerprint=fingerprintFromRows(newWithTotal);
      const lastSnap=(historyData&&historyData.length)?historyData[0]:null;
      let isDuplicate=false;
      if(lastSnap&&lastSnap.rows_snapshot&&lastSnap.rows_snapshot.length===newWithTotal.length){
        const lastFingerprint=fingerprintFromRows(lastSnap.rows_snapshot.map(r=>({name:r.name,total:r.total,store:r.store})));
        isDuplicate=lastFingerprint===newFingerprint;
      }
      let gapNote='';
      if(lastSnap&&lastSnap.date){
        const gapDays=Math.round((snapDate.getTime()-new Date(lastSnap.date).getTime())/86400000);
        if(gapDays>1) gapNote=` Ada jeda ${gapDays} hari sejak snapshot terakhir (${escapeHtml(lastSnap.label)}) — Yesterday vs Today &amp; Weekly akan membandingkan rentang ${gapDays} hari ini, bukan 1 hari.`;
      }
      if(!isDuplicate){
        const label=isBackfill ? (snapDate.toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'})+' (Susulan)') : new Date().toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'});
        const snapResult=await createSnapshotEntry(label,{fileName:file.name,date:snapDate.toISOString()});
        if(snapResult.ok)await afterSnapshotSaved();
        if(customDateVal){ const dEl=document.getElementById('customSnapshotDate'); if(dEl) dEl.value=''; }
      }
      setStatus(`✓ Data berjalan diperbarui: ${newRows.length} ERO.${isBackfill?' Disimpan sebagai data susulan tanggal '+snapDate.toLocaleDateString('id-ID',{dateStyle:'medium'})+'.':''}${gapNote}`,true);
    }
    document.getElementById('fileInput').value='';
  }catch(err){setStatus('Gagal membaca file: '+err.message,false);}};reader.readAsArrayBuffer(file);
}
const dz=document.getElementById('dropZone');['dragover','dragenter'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('drag');}));['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('drag');}));dz.addEventListener('drop',e=>{const file=e.dataTransfer.files[0];if(file)handleFile(file);});
function importPaste(){
  if(!isAdmin){alert('Login admin terlebih dahulu.');return;}const text=document.getElementById('pasteBox').value.trim();if(!text)return;const lines=text.split('\n').map(l=>l.trim()).filter(Boolean);lines.forEach(line=>{const cols=line.split('\t').map(c=>c.trim());if(cols.length<8)return;rows.push({name:cols[0],device:parseFloat(cols[1])||0,acc:parseFloat(cols[2])||0,operator:parseFloat(cols[3])||0,boltech:parseFloat(cols[4])||0,arAcc:parseFloat(cols[5])||0,arBoltech:parseFloat(cols[6])||0,store:(cols.length>=10?cols[9]:cols[7])||'',prevRank:null,active:true,target:{},ach:{},est:{}});});document.getElementById('pasteBox').value='';lastUpdateLabel=new Date().toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'});schedulePersist();render();
}
function addRow(){if(!isAdmin){alert('Login admin terlebih dahulu.');return;}rows.push({name:'Nama baru',device:0,acc:0,operator:0,boltech:0,arAcc:0,arBoltech:0,store:'',prevRank:null,active:true,target:{},ach:{},est:{}});lastUpdateLabel=new Date().toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'});schedulePersist();render();}
function toggleEROStatus(i){
  if(!isAdmin||!rows[i])return;
  rows[i].active=rows[i].active===false;
  lastUpdateLabel=new Date().toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'});
  schedulePersist();render();
}
function removeRow(i){if(!isAdmin)return;rows.splice(i,1);lastUpdateLabel=new Date().toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'});schedulePersist();render();}
function updateField(i,field,val){if(!isAdmin)return;rows[i][field]=(field==='name'||field==='store')?val:(parseFloat(val)||0);lastUpdateLabel=new Date().toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'});schedulePersist();render();}
function clearAll(){if(!isAdmin){alert('Login admin terlebih dahulu.');return;}if(!confirm('Hapus semua data ranking dari server pusat?'))return;rows=[];lastUpdateLabel=new Date().toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'});schedulePersist();render();}
function computeStoreExtremes(withTotalRows){
  const map = {};
  withTotalRows.forEach(r=>{
    const s = r.store || '(Tanpa Store)';
    if(!map[s]) map[s] = {sum:0,count:0};
    map[s].sum += r.total; map[s].count++;
  });
  const list = Object.keys(map).map(s=>({store:s, avg:map[s].sum/map[s].count}));
  if(list.length===0) return {bestStore:null,bestAvg:null,worstStore:null,worstAvg:null};
  list.sort((a,b)=>b.avg-a.avg);
  const best = list[0], worst = list[list.length-1];
  return {bestStore:best.store, bestAvg:Math.round(best.avg*100)/100, worstStore:worst.store, worstAvg:Math.round(worst.avg*100)/100};
}
function fingerprintFromRows(list){
  return list.map(r=>`${r.name}|${Number(r.total).toFixed(2)}|${r.store||''}`).sort().join(';');
}
const HISTORY_OPTIONAL_FIELDS = ['rows_snapshot','file_name','uploaded_by','best_store','best_store_avg','worst_store','worst_store_avg'];
async function insertHistoryWithFallback(item){
  let payload = {...item};
  const missingFields = [];
  while(true){
    const {error} = await sb.from('rank_history').insert(payload);
    if(!error) return {ok:true, missingFields};
    const msg = (error.message||'').toLowerCase();
    const found = HISTORY_OPTIONAL_FIELDS.find(f=>Object.prototype.hasOwnProperty.call(payload,f) && msg.includes(f.toLowerCase()));
    if(found){ delete payload[found]; missingFields.push(found); continue; }
    return {ok:false, message:error.message};
  }
}
async function createSnapshotEntry(label, meta={}){
  const wt=rows.filter(isActive).map(r=>({...r,total:calcTotal(r)}));
  const avg=wt.reduce((s,r)=>s+r.total,0)/wt.length;
  const sorted=[...wt].sort((a,b)=>b.total-a.total);
  const rowsSnapshot=sorted.map((r,i)=>({...buildDataMeta(r),name:r.name,total:Math.round(r.total*100)/100,grade:calcGrade(r.total),store:r.store||'',rank:i+1}));
  const extremes = computeStoreExtremes(wt);
  const item={
    label,date:meta.date||new Date().toISOString(),avg:Math.round(avg*100)/100,
    top:sorted[0]?.name||'-',top_pt:sorted[0]?.total||0,
    bottom:sorted[sorted.length-1]?.name||'-',bottom_pt:sorted[sorted.length-1]?.total||0,
    count:rowsSnapshot.length,rows_snapshot:rowsSnapshot,
    file_name: meta.fileName || null,
    uploaded_by: meta.uploadedBy || currentUser?.email || 'Admin',
    best_store: extremes.bestStore, best_store_avg: extremes.bestAvg,
    worst_store: extremes.worstStore, worst_store_avg: extremes.worstAvg
  };
  const result = await insertHistoryWithFallback(item);
  if(!result.ok) return {ok:false, message:result.message};
  return {ok:true, noDetail: result.missingFields.includes('rows_snapshot'), missingFields: result.missingFields};
}
async function afterSnapshotSaved(){
  await loadHistory();
  renderYesterdayToday();
  renderMoversPanel();
  renderAlerts(rows.map(r=>({...r,total:calcTotal(r)})), [...rows].sort((a,b)=>calcTotal(b)-calcTotal(a)));
}
async function saveSnapshot(){
  if(!isAdmin){alert('Login sebagai admin terlebih dahulu.');return;}if(rows.length===0){alert('Belum ada data untuk disimpan.');return;}
  const label=prompt('Nama snapshot (contoh: 28 Agu 2026)',new Date().toLocaleDateString('id-ID'));if(label===null)return;
  const result=await createSnapshotEntry(label);
  if(!result.ok){alert('Gagal menyimpan snapshot: '+result.message);return;}
  await afterSnapshotSaved();
  if(result.missingFields && result.missingFields.length){
    const alterStatements = result.missingFields.map(f=>{
      const type = f==='rows_snapshot' ? 'jsonb' : (f.includes('_avg') ? 'numeric' : 'text');
      return `ALTER TABLE rank_history ADD COLUMN IF NOT EXISTS ${f} ${type};`;
    }).join('\n');
    alert('Snapshot tersimpan, tapi beberapa kolom tambahan belum ada di database sehingga detail tidak lengkap: '+result.missingFields.join(', ')+'.\n\nJalankan ini di Supabase SQL Editor agar lengkap:\n\n'+alterStatements);
  } else {
    alert('Snapshot tersimpan di server pusat.');
  }
}

function render(){
  const allWithTotals=rows.map((r,i)=>({...r,total:calcTotal(r),idx:i}));
  const activeRows=allWithTotals.filter(isActive);
  const sorted=activeRows.slice().sort((a,b)=>b.total-a.total);
  lastWithTotals=allWithTotals;
  const n=activeRows.length;
  // Dashboard bisa menampilkan data arsip bulan sebelumnya (dashboardMonth != 'current').
  // dActive/dSorted/dn dipakai khusus panel Dashboard; tabel Data ERO & Data Toko tetap memakai data berjalan.
  renderDashboardMonthPicker();
  const dsv=getDashboardDataset();
  const dActive=dsv.archive?dsv.active:activeRows, dSorted=dsv.archive?dsv.sorted:sorted, dn=dActive.length;
  document.getElementById('rowCount').textContent=n;
  document.getElementById('statCount').textContent=dn;
  const avg=dn?(dActive.reduce((s,r)=>s+r.total,0)/dn):0;
  document.getElementById('statAvg').textContent=avg.toFixed(2);
  renderKpiHero(dActive,dsv);
  renderBentoExtras(dActive,dsv);
  document.getElementById('lastUpdate').textContent=dsv.archive?'':(lastUpdateLabel?('Update terakhir: '+lastUpdateLabel):'');
  const lbSfx=document.getElementById('dashLbSuffix'); if(lbSfx) lbSfx.textContent=dsv.archive?(' — '+monthLabel(dsv.month)):'';

  const podium=document.getElementById('podium');
  if(!dSorted.length)podium.innerHTML='<div class="empty"><i class="ti ti-trophy"></i>Belum ada data aktif.</div>';
  else{
    const top3=dSorted.slice(0,3),cls=['p1','p2','p3'],bar=['b1','b2','b3'],rankNum=[1,2,3];
    const medal=['Champion','Runner Up','Third Place'];
    podium.innerHTML=top3.map((r,i)=>`<div class="podium-card ${cls[i]}"><div class="avatar">${initials(r.name)}<div class="rank-badge">${rankNum[i]}</div></div><div class="podium-bar ${bar[i]}"><div class="pt">${r.total.toFixed(2)}</div></div><div class="podium-medal"><i class="ti ti-medal"></i>${medal[i]}</div><div class="podium-name">${escapeHtml(r.name)}</div><div class="podium-store">${escapeHtml(r.store||'')}</div></div>`).join('');
  }

  const lb=document.getElementById('leaderboard');
  if(!dSorted.length)lb.innerHTML='<div class="empty"><i class="ti ti-list-details"></i>Belum ada data aktif.</div>';
  else{
    const maxPt=Math.max(...dSorted.map(r=>r.total),8);
    lb.innerHTML=dSorted.map((r,i)=>{
      const gc=gradeClass(calcGrade(r.total)),pct=Math.max(4,(r.total/maxPt)*100);
      const fmtLbPt=v=>Number(v||0).toFixed(2).replace(/\.00$/,'');
      const pointGrid=`<div class="point-category-grid"><span><b>Device</b> ${fmtLbPt(r.device)}</span><span><b>ACC</b> ${fmtLbPt(r.acc)}</span><span><b>Operator</b> ${fmtLbPt(r.operator)}</span><span><b>Boltech</b> ${fmtLbPt(r.boltech)}</span><span><b>AR ACC</b> ${fmtLbPt(r.arAcc)}</span><span><b>AR Boltech</b> ${fmtLbPt(r.arBoltech)}</span></div>`;
      return `<div class="leaderboard-row"><div class="lb-rank">${i+1}</div><div class="lb-name clickable-name" data-name="${escapeAttr(r.name)}" onclick="openPersonModal(this.dataset.name)">${escapeHtml(r.name)}<span class="lb-store">${escapeHtml(r.store||'')}</span></div><div class="lb-progress-wrap"><div class="lb-progress-head"><span class="lb-progress-label">Progress</span><span class="lb-grade grade ${gc}">${escapeHtml(calcGrade(r.total))}</span></div><div class="lb-track"><div class="lb-fill ${gc}" style="width:${pct}%"></div></div></div><div class="lb-categories">${pointGrid}</div><div>${dsv.archive?'<span class="rank-delta same"><i class="ti ti-minus"></i></span>':rankDeltaHtml(r.prevRank,i+1)}</div><div class="lb-pt">${r.total.toFixed(2)}</div></div>`;
    }).join('');
  }

  const watch=document.getElementById('watchlist');
  if(!dSorted.length)watch.innerHTML='<div class="empty">Belum ada data.</div>';
  else{
    const bottom3=dSorted.slice(-3).reverse();
    watch.innerHTML=bottom3.map(r=>{const g=calcGrade(r.total);return `<div class="watch-row"><div class="watch-left"><i class="ti ti-alert-triangle"></i><div><div class="watch-name">${escapeHtml(r.name)}</div><div class="watch-store">${escapeHtml(r.store||'')}</div><div class="watch-grade">${g}</div></div></div><div class="watch-pt">${r.total.toFixed(2)}</div></div>`;}).join('');
  }

  renderStorePerformanceMonthFilter();
  const storePerformanceRows=getStorePerformanceRows();
  const storeActiveRows=storePerformanceRows.filter(isActive).map(r=>({...r,total:Number.isFinite(Number(r.total))?Number(r.total):calcTotal(r)}));
  const storeMap={};
  storeActiveRows.forEach(r=>{const s=r.store||'(Tanpa Store)';if(!storeMap[s])storeMap[s]={count:0,sum:0,Perfect:0,Good:0,['Need Improve']:0,Bad:0,Poor:0};storeMap[s].count++;storeMap[s].sum+=r.total;storeMap[s][calcGrade(r.total)]++;});
  const storeRows=Object.keys(storeMap).map(s=>({store:s,count:storeMap[s].count,avg:storeMap[s].sum/storeMap[s].count,...storeMap[s]})).sort((a,b)=>a.avg-b.avg);
  const storeTbody=document.getElementById('storeTableBody');
  if(storeTbody)storeTbody.innerHTML=storeRows.length?storeRows.map((s,i)=>{
    const agg=computeStoreTargetAgg(s.store,storePerformanceRows);
    const targetText=agg.count?fmtTarget(agg.targetSum):'-';
    const achDisplay={deviceVal:agg.achSum.device,accVal:agg.achSum.acc,operator:agg.achSum.operator,boltechVal:agg.achSum.boltech,arAcc:agg.achSum.arAcc,arBoltech:agg.achSum.arBoltech};
    const achText=agg.count?fmtAchievement(achDisplay):'-';
    return `<tr class="${i===0?'store-worst':''}"><td class="name clickable-name" data-store="${escapeAttr(s.store)}" onclick="openStoreModal(this.dataset.store)">${escapeHtml(s.store)}</td><td data-label="ERO">${s.count}</td><td data-label="Rata-rata"><b>${s.avg.toFixed(2)}</b></td><td class="target-ach-cell" data-label="Target Store">${escapeHtml(targetText)}</td><td class="target-ach-cell" data-label="Pencapaian Store">${escapeHtml(achText)}</td><td data-label="Perfect">${s.Perfect}</td><td data-label="Good">${s.Good}</td><td data-label="Need Improve">${s['Need Improve']}</td><td data-label="Bad">${s.Bad}</td><td data-label="Poor">${s.Poor}</td></tr>`;
  }).join(''):'<tr><td colspan="10" class="empty">Belum ada data.</td></tr>';

  const tbody=document.getElementById('tableBody');
  const ranked=sorted.map((r,i)=>({...r,rank:i+1}));
  populateStoreOptions(ranked);
  const filtered=allWithTotals.filter(r=>(!filterStore||r.store===filterStore)&&(!filterGrade||calcGrade(r.total)===filterGrade)&&(!searchName||r.name.toLowerCase().includes(searchName))).sort((a,b)=>{
    if(isActive(a)!==isActive(b))return isActive(a)?-1:1; return b.total-a.total;
  });
  const countEl=document.getElementById('filterCount');if(countEl)countEl.textContent=(filterStore||filterGrade||searchName)?`Menampilkan ${filtered.length} baris`:`${n} ERO aktif · ${allWithTotals.length-n} nonaktif`;
  tbody.innerHTML=filtered.map(r=>{
    const grade=calcGrade(r.total),gc=gradeClass(grade),rank=ranked.find(x=>x.name===r.name)?.rank||'-';
    const active=isActive(r);
    const progress=Math.min(100,Math.max(0,(r.total/10)*100));
    const fmtPt=v=>Number(v||0).toFixed(2).replace(/\.00$/,'');
    const tapCell=`<div class="point-category-grid"><span><b>Device</b> ${fmtPt(r.device)}</span><span><b>ACC</b> ${fmtPt(r.acc)}</span><span><b>Operator</b> ${fmtPt(r.operator)}</span><span><b>Boltech</b> ${fmtPt(r.boltech)}</span><span><b>AR ACC</b> ${fmtPt(r.arAcc)}</span><span><b>AR Boltech</b> ${fmtPt(r.arBoltech)}</span></div>`;
    if(isAdmin)return `<tr style="${active?'':'opacity:.62;'}"><td class="name"><input value="${escapeAttr(r.name)}" onchange="updateField(${r.idx},'name',this.value)"></td><td class="rank-cell" data-label="Rank"><b>#${rank}</b></td><td class="target-ach-cell">${tapCell}</td><td><span class="grade ${gc}">${grade}</span></td><td><div class="mini-progress"><span style="width:${progress}%"></span></div></td><td><button class="status-toggle ${active?'':'danger'}" onclick="toggleEROStatus(${r.idx})">${active?'Aktif':'Nonaktif'}</button></td><td class="store" data-label="Store"><input value="${escapeAttr(r.store||'')}" onchange="updateField(${r.idx},'store',this.value)"></td><td><button class="rm" data-name="${escapeAttr(r.name)}" onclick="openPersonModal(this.dataset.name)" title="Lihat detail"><i class="ti ti-chart-line"></i></button><button class="rm" onclick="removeRow(${r.idx})"><i class="ti ti-x"></i></button></td></tr>`;
    return `<tr style="${active?'':'opacity:.62;'}"><td class="name readonly-val clickable-name" data-name="${escapeAttr(r.name)}" onclick="openPersonModal(this.dataset.name)">${escapeHtml(r.name)}</td><td class="rank-cell" data-label="Rank"><b>#${rank}</b></td><td class="target-ach-cell">${tapCell}</td><td><span class="grade ${gc}">${grade}</span></td><td><div class="mini-progress"><span style="width:${progress}%"></span></div></td><td>${active?'<span class="active-badge">Aktif</span>':'<span class="inactive-badge">Resign / Nonaktif</span>'}</td><td class="readonly-val" data-label="Store">${escapeHtml(r.store||'')}</td><td></td></tr>`;
  }).join('');
  renderStoreCompareControls();renderYesterdayToday();renderStoreScore(storeRows);renderMoversPanel();renderAlerts(activeRows,sorted);renderMobileLeader(activeRows);renderMonthlyCompare();renderDashboardCharts(activeRows);renderDashboardArchiveExtras(dsv);
}

// =========================================
// DASHBOARD: tampilkan data lengkap bulan sebelumnya dari arsip
// =========================================
let dashboardMonth = 'current';

function getArchiveSnapshotForMonth(monthKey){
  const snaps=(historyData||[]).filter(h=>archiveMonthFromSnapshot(h)===monthKey && Array.isArray(h.rows_snapshot) && h.rows_snapshot.length);
  if(!snaps.length) return null;
  // Jika bulan yang sama diarsipkan lebih dari sekali, pakai unggahan terbaru.
  snaps.sort((a,b)=>(new Date(b.date)-new Date(a.date)) || (new Date(b.created_at||0)-new Date(a.created_at||0)));
  return snaps[0];
}
function getDashboardArchiveMonths(){
  const seen=new Set(), out=[];
  [...(historyData||[])].sort((a,b)=>new Date(b.date)-new Date(a.date)).forEach(h=>{
    const key=archiveMonthFromSnapshot(h);
    if(key && !seen.has(key) && Array.isArray(h.rows_snapshot) && h.rows_snapshot.length){ seen.add(key); out.push(key); }
  });
  return out;
}
function getDashboardDataset(){
  if(dashboardMonth==='current') return {archive:false};
  const snap=getArchiveSnapshotForMonth(dashboardMonth);
  if(!snap) return {archive:false};
  const all=snap.rows_snapshot.map(r=>({...r,active:r.active!==false,target:r.target||{},ach:r.ach||{},est:r.est||{},total:Number.isFinite(Number(r.total))?Number(r.total):calcTotal(r)}));
  const active=all.filter(isActive);
  const sorted=active.slice().sort((a,b)=>b.total-a.total);
  return {archive:true,month:dashboardMonth,snap,all,active,sorted};
}
// ---- KPI hero (rata-rata, pembanding bulan lalu, tren, distribusi grade) ----
function prevMonthKey(key){
  const [y,m]=key.split('-').map(Number); const d=new Date(y,m-2,1);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
}
function snapshotAvg(snap){
  if(!snap) return null;
  const act=(snap.rows_snapshot||[]).filter(isActive);
  if(act.length) return act.reduce((sum,r)=>sum+(Number.isFinite(Number(r.total))?Number(r.total):calcTotal(r)),0)/act.length;
  return Number.isFinite(Number(snap.avg))?Number(snap.avg):null;
}
function getKpiComparison(dsv){
  const key=dsv.archive?dsv.month:getCurrentMonthKey();
  const pk=prevMonthKey(key);
  const v=snapshotAvg(getArchiveSnapshotForMonth(pk));
  if(v!==null) return {value:v,label:monthLabel(pk)};
  if(!dsv.archive){
    const today=new Date(); today.setHours(0,0,0,0);
    const prev=[...(historyData||[])].filter(h=>!archiveMonthFromSnapshot(h)&&Number.isFinite(Number(h.avg))&&new Date(h.date)<today).sort((x,y)=>new Date(y.date)-new Date(x.date))[0];
    if(prev) return {value:Number(prev.avg),label:'snapshot terakhir sebelum hari ini'};
  }
  return null;
}
function getKpiTrend(dsv){
  if(dsv.archive){
    const keys=getDashboardArchiveMonths().slice().sort().filter(k=>k<=dsv.month).slice(-12);
    const vals=keys.map(k=>snapshotAvg(getArchiveSnapshotForMonth(k))).filter(v=>v!==null);
    return {vals,caption:`Rata-rata per bulan (${vals.length} arsip)`};
  }
  const vals=[...(historyData||[])].filter(h=>!archiveMonthFromSnapshot(h)&&Number.isFinite(Number(h.avg))).sort((x,y)=>new Date(x.date)-new Date(y.date)).slice(-30).map(h=>Number(h.avg));
  return {vals,caption:`Tren ${vals.length} snapshot terakhir`};
}
function buildKpiSpark(vals){
  const W=300,H=64,pad=6,min=Math.min(...vals),max=Math.max(...vals),rng=(max-min)||1;
  const norm=v=>max===min?0.5:(v-min)/rng, step=W/(vals.length-1);
  const pts=vals.map((v,i)=>[i*step,pad+(H-pad*2)*(1-norm(v))]);
  const line=pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
  const col=vals[vals.length-1]>=vals[0]?'var(--success)':'var(--danger)';
  const last=pts[pts.length-1];
  return `<div class="kpi-spark-plot"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><polygon points="0,${H} ${line} ${W},${H}" style="fill:${col};opacity:.1"/><polyline points="${line}" fill="none" style="stroke:${col}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg><span class="dot" style="top:${(last[1]/H*100).toFixed(1)}%;background:${col}"></span></div>`;
}
function renderKpiHero(dActive,dsv){
  const n=dActive.length;
  const avg=n?dActive.reduce((sum,r)=>sum+r.total,0)/n:0;
  const per=document.getElementById('kpiPeriodName');
  if(per) per.textContent=dsv.archive?('· Arsip '+monthLabel(dsv.month)):('· '+monthLabel(getCurrentMonthKey()));
  const dEl=document.getElementById('kpiDelta');
  if(dEl){
    const cmp=n?getKpiComparison(dsv):null;
    if(cmp){
      const d=avg-cmp.value, cls=Math.abs(d)<0.005?'same':d>0?'up':'down';
      const arrow=cls==='up'?'▲':cls==='down'?'▼':'●';
      dEl.className='kpi-delta '+cls;
      dEl.innerHTML=`<b>${arrow} ${d>0.005?'+':d<-0.005?'-':''}${Math.abs(d).toFixed(2)}</b><span class="vs">vs ${escapeHtml(cmp.label)}</span>`;
    } else { dEl.className='kpi-delta none'; dEl.textContent='Belum ada pembanding'; }
  }
  const sp=document.getElementById('kpiSpark');
  if(sp){
    const t=getKpiTrend(dsv);
    sp.innerHTML=t.vals.length>=2?`<div class="kpi-spark-cap">${escapeHtml(t.caption)}</div>${buildKpiSpark(t.vals)}`:'';
  }
  const counts={}; GRADE_ORDER.forEach(g=>counts[g]=0);
  dActive.forEach(r=>{const g=calcGrade(r.total); if(counts[g]!==undefined) counts[g]++;});
  const pctOf=g=>n?Math.round(counts[g]/n*100):0;
  const stack=document.getElementById('kpiStack');
  if(stack){
    stack.innerHTML=n?GRADE_ORDER.filter(g=>counts[g]>0).map(g=>`<span class="kpi-seg ${gradeClass(g)}" style="flex:${counts[g]}" title="${g}: ${counts[g]} ERO (${pctOf(g)}%)">${pctOf(g)>=9?counts[g]:''}</span>`).join(''):'<span class="kpi-seg-empty">Belum ada data aktif</span>';
    stack.setAttribute('aria-label','Distribusi grade: '+GRADE_ORDER.map(g=>`${g} ${counts[g]}`).join(', '));
  }
  const legend=document.getElementById('kpiLegend');
  if(legend) legend.innerHTML=GRADE_ORDER.map(g=>`<li class="${counts[g]?'':'zero'} lg-${gradeClass(g)}"><i class="g-sw ${gradeClass(g)}"></i><span class="lg-name">${g}</span><b>${counts[g]}</b><span class="lg-pct">${pctOf(g)}%</span></li>`).join('');
}

function renderBentoExtras(dActive,dsv){
  const set=(id,t)=>{const e=document.getElementById(id); if(e) e.textContent=t;};
  const n=dActive.length, total=dsv.archive?n:rows.length;
  set('kpiTotalEro','/ '+total+' terdaftar');
  set('kpiStoreCount',new Set(dActive.map(r=>r.store).filter(Boolean)).size+' Toko');
  set('kpiActivePct',total?((n/total*100).toFixed(1)+'% ERO aktif'):'');
  const c=g=>dActive.filter(r=>calcGrade(r.total)===g).length, pc=v=>n?Math.round(v/n*100)+'%':'0%';
  set('kpiHealthy',pc(c('Perfect')+c('Good'))); set('kpiWatch',pc(c('Bad')+c('Poor')));
  const avgOf=fn=>{const v=dActive.map(fn).filter(x=>typeof x==='number'&&isFinite(x)); return v.length?v.reduce((a,b)=>a+b,0)/v.length:null;};
  const P=[['Device Selling','device','#F59E0B'],['Accessories','acc','#60A5FA'],['Operator','operator','#34D399'],['Boltech Protection','boltech','#A78BFA']];
  const list=document.getElementById('pilarList');
  if(list) list.innerHTML=P.map(([lb,k,col])=>{const v=avgOf(r=>r.est&&r.est[k]); return v===null?`<div class="pilar-row"><div class="ph"><span>${lb}</span><span style="color:var(--text-muted)">–</span></div><div class="pilar-track"></div></div>`:`<div class="pilar-row"><div class="ph"><span>${lb}</span><span style="color:${col}">${(v*100).toFixed(1)}%</span></div><div class="pilar-track"><i style="width:${Math.min(100,v*100)}%;background:${col}"></i></div></div>`;}).join('');
  const a=avgOf(r=>r.ach&&r.ach.arAcc), b=avgOf(r=>r.ach&&r.ach.arBoltech);
  const foot=document.getElementById('pilarFoot');
  if(foot) foot.innerHTML=`<span>Attach Rate Acc: <b>${a===null?'–':a.toFixed(2)}</b></span><span>AR Boltech: <b>${b===null?'–':(b*100).toFixed(1)+'%'}</b></span>`;
}

function renderDashboardMonthPicker(){
  const sel=document.getElementById('dashMonthSelect'); if(!sel) return;
  const months=getDashboardArchiveMonths();
  if(dashboardMonth!=='current' && !months.includes(dashboardMonth)) dashboardMonth='current';
  sel.innerHTML=`<option value="current">Bulan berjalan (${escapeHtml(monthLabel(getCurrentMonthKey()))})</option>`+months.map(k=>`<option value="${escapeAttr(k)}">Arsip ${escapeHtml(monthLabel(k))}</option>`).join('');
  sel.value=dashboardMonth;
  sel.disabled=!months.length;
  const hint=document.getElementById('dashPeriodHint'); if(hint) hint.textContent=months.length?'':'Belum ada arsip. Admin bisa mengunggahnya dari Kelola Data.';
  const back=document.getElementById('dashBackBtn'); if(back) back.style.display=dashboardMonth==='current'?'none':'inline-flex';
  const section=document.querySelector('[data-view-section="dashboard"]');
  if(section) section.classList.toggle('dash-archive-mode',dashboardMonth!=='current');
}
function changeDashboardMonth(key){
  dashboardMonth=key||'current';
  const search=document.getElementById('dashArchiveSearch'); if(search) search.value='';
  render();
}
function openDashboardStoreModal(storeName){
  openStoreModal(storeName);
  if(dashboardMonth!=='current'){ currentStoreModalMonth=dashboardMonth; renderStoreModalForMonth(); }
}
function renderDashboardArchiveExtras(ds){
  const banner=document.getElementById('dashArchiveBanner');
  const storeEl=document.getElementById('dashArchiveStoreTable');
  const detailEl=document.getElementById('dashArchiveDetail');
  if(!ds || !ds.archive){
    if(banner) banner.innerHTML='';
    if(storeEl) storeEl.innerHTML='';
    if(detailEl) detailEl.innerHTML='';
    return;
  }
  const label=monthLabel(ds.month);
  document.querySelectorAll('.dash-sfx').forEach(el=>{ el.textContent=' — '+label; });
  const src=String(ds.snap.file_name||'').replace(/^ARCHIVE_MONTH:\d{4}-\d{2}\|/,'');
  const inactive=ds.all.length-ds.active.length;
  if(banner) banner.innerHTML=`<i class="ti ti-archive"></i><div>Menampilkan <b>arsip ${escapeHtml(label)}</b>: ${ds.active.length} ERO aktif${inactive?` (+${inactive} nonaktif)`:''}. Data bulan berjalan tidak berubah.${src?`<span class="dab-src">File: ${escapeHtml(src)}</span>`:''}</div>`;

  // Ringkasan per store
  if(storeEl){
    const gradeNames=['Perfect','Good','Need Improve','Bad','Poor'];
    const map={};
    ds.active.forEach(r=>{
      const st=r.store||'(Tanpa Store)';
      const m=map[st]||(map[st]={count:0,sum:0,g:{Perfect:0,Good:0,'Need Improve':0,Bad:0,Poor:0}});
      m.count++; m.sum+=r.total; m.g[calcGrade(r.total)]++;
    });
    const list=Object.keys(map).map(st=>({store:st,count:map[st].count,g:map[st].g,avg:map[st].sum/map[st].count})).sort((a,b)=>b.avg-a.avg);
    storeEl.innerHTML=list.length
      ? `<thead><tr><th class="name">Store</th><th>ERO</th><th>Rata-rata</th>${gradeNames.map(g=>`<th>${g}</th>`).join('')}<th>Target Store</th><th>Pencapaian Store</th></tr></thead><tbody>${list.map(st=>{
          const agg=computeStoreTargetAgg(st.store,ds.active);
          const achDisplay={deviceVal:agg.achSum.device,accVal:agg.achSum.acc,operator:agg.achSum.operator,boltechVal:agg.achSum.boltech,arAcc:agg.achSum.arAcc,arBoltech:agg.achSum.arBoltech};
          return `<tr><td class="name clickable-name" data-store="${escapeAttr(st.store)}" onclick="openDashboardStoreModal(this.dataset.store)">${escapeHtml(st.store)}</td><td>${st.count}</td><td><b>${st.avg.toFixed(2)}</b></td>${gradeNames.map(g=>`<td>${st.g[g]}</td>`).join('')}<td class="target-ach-cell">${escapeHtml(agg.count?fmtTarget(agg.targetSum):'-')}</td><td class="target-ach-cell">${escapeHtml(agg.count?fmtAchievement(achDisplay):'-')}</td></tr>`;
        }).join('')}</tbody>`
      : '<tbody><tr><td colspan="10" class="empty">Belum ada data store pada arsip ini.</td></tr></tbody>';
  }
  renderDashboardArchiveDetail();
}
function renderDashboardArchiveDetail(){
  const el=document.getElementById('dashArchiveDetail'); if(!el) return;
  const ds=getDashboardDataset();
  if(!ds.archive){ el.innerHTML=''; return; }
  const q=(document.getElementById('dashArchiveSearch')?.value||'').trim().toLowerCase();
  const rankOf=new Map(); ds.sorted.forEach((r,i)=>rankOf.set(r,i+1));
  const list=ds.all
    .filter(r=>!q || String(r.name||'').toLowerCase().includes(q) || String(r.store||'').toLowerCase().includes(q))
    .sort((a,b)=>{ if(isActive(a)!==isActive(b)) return isActive(a)?-1:1; return b.total-a.total; });
  const countEl=document.getElementById('dashArchiveCount');
  if(countEl) countEl.textContent=q?`Menampilkan ${list.length} dari ${ds.all.length} baris`:`${ds.active.length} ERO aktif`;
  if(!list.length){ el.innerHTML='<div class="empty"><i class="ti ti-search"></i>Tidak ada ERO yang cocok dengan pencarian.</div>'; return; }
  const fmtPt=v=>Number(v||0).toFixed(2).replace(/\.00$/,'');
  const hasKeys=o=>o && Object.keys(o).length>0;
  el.innerHTML=`<table class="compare-table dash-detail-table"><thead><tr><th>#</th><th class="name">Nama ERO</th><th>Store</th><th>Device</th><th>ACC</th><th>Operator</th><th>Boltech</th><th>AR ACC</th><th>AR Boltech</th><th>Total</th><th>Grade</th><th>Target</th><th>Pencapaian</th></tr></thead><tbody>${list.map(r=>{
    const grade=calcGrade(r.total), active=isActive(r);
    return `<tr style="${active?'':'opacity:.62;'}"><td class="pt-cell">${active?('#'+rankOf.get(r)):'-'}</td><td class="name readonly-val clickable-name" data-name="${escapeAttr(r.name||'')}" onclick="openPersonModal(this.dataset.name)">${escapeHtml(r.name||'')}</td><td class="store-cell">${escapeHtml(r.store||'')}</td><td class="pt-cell">${fmtPt(r.device)}</td><td class="pt-cell">${fmtPt(r.acc)}</td><td class="pt-cell">${fmtPt(r.operator)}</td><td class="pt-cell">${fmtPt(r.boltech)}</td><td class="pt-cell">${fmtPt(r.arAcc)}</td><td class="pt-cell">${fmtPt(r.arBoltech)}</td><td class="pt-cell"><b>${r.total.toFixed(2)}</b></td><td><span class="grade ${gradeClass(grade)}">${grade}</span></td><td class="target-ach-cell">${escapeHtml(hasKeys(r.target)?fmtTarget(r.target):'-')}</td><td class="target-ach-cell">${escapeHtml(hasKeys(r.ach)?fmtAchievement(r.ach):'-')}</td></tr>`;
  }).join('')}</tbody></table>`;
}

function renderMonthlyCompare(){
  renderDashboardMonthPicker(); // daftar arsip di Dashboard ikut diperbarui setiap histori dimuat ulang
  const sel=document.getElementById('archiveSelect'), kpi=document.getElementById('monthlyKpis'), table=document.getElementById('monthlyCompareTable');
  if(!sel||!kpi||!table)return;
  const archives=historyData.filter(h=>archiveMonthFromSnapshot(h)).sort((a,b)=>new Date(b.date)-new Date(a.date));
  const currentMonth=new Date().toLocaleDateString('id-ID',{month:'long',year:'numeric'});
  const currentLabel=document.getElementById('currentMonthLabel');if(currentLabel)currentLabel.textContent=currentMonth;
  const prevVal=sel.value;
  sel.innerHTML=archives.length?archives.map((h,i)=>`<option value="${i}">${escapeHtml(monthLabel(archiveMonthFromSnapshot(h)))}</option>`).join(''):'<option value="">Belum ada arsip bulan sebelumnya</option>';
  if(prevVal && [...sel.options].some(o=>o.value===prevVal))sel.value=prevVal;
  if(!archives.length){kpi.innerHTML='';table.innerHTML='<div class="empty"><i class="ti ti-archive"></i>Upload data bulan sebelumnya dari menu Kelola Data untuk mulai membandingkan.</div>';return;}
  const prev=archives[Number(sel.value)||0];
  const pm={};(prev.rows_snapshot||[]).forEach(r=>pm[r.name]=r);
  const cur=getRankedRows(rows); const cm={};cur.forEach(r=>cm[r.name]=r);
  const names=[...new Set([...Object.keys(pm),...Object.keys(cm)])];
  let pointPrev=0,pointCur=0,common=0,improved=0;
  names.forEach(n=>{if(pm[n]&&cm[n]){common++;pointPrev+=Number(pm[n].total)||0;pointCur+=Number(cm[n].total)||0;if(cm[n].rank<pm[n].rank)improved++;}});
  const avgPrev=prev.avg||0,avgCur=cur.length?cur.reduce((s,r)=>s+r.total,0)/cur.length:0;
  const d=avgCur-avgPrev;
  kpi.innerHTML=`<div class="compare-kpi"><div class="k">Rata-rata Point</div><div class="v">${avgPrev.toFixed(2)} → ${avgCur.toFixed(2)}</div><div class="${d>=0?'delta-up':'delta-down'}">${d>=0?'▲ +':'▼ '}${Math.abs(d).toFixed(2)}</div></div><div class="compare-kpi"><div class="k">ERO Dibandingkan</div><div class="v">${common}</div><div class="muted">nama yang ada di kedua periode</div></div><div class="compare-kpi"><div class="k">ERO Naik Rank</div><div class="v">${improved}</div><div class="muted">dibanding bulan sebelumnya</div></div><div class="compare-kpi"><div class="k">Perubahan Total Point</div><div class="v">${(pointCur-pointPrev)>=0?'+':''}${(pointCur-pointPrev).toFixed(2)}</div><div class="${pointCur-pointPrev>=0?'delta-up':'delta-down'}">Current vs archive</div></div>`;
  const sortedNames=names.sort((a,b)=>(cm[b]?.total??-1)-(cm[a]?.total??-1));
  table.innerHTML=`<table class="compare-table"><thead><tr><th class="name">Nama ERO</th><th>Rank Lalu</th><th>Rank Kini</th><th>Point Lalu</th><th>Point Kini</th><th>Delta</th><th>Grade Kini</th><th>Store Kini</th></tr></thead><tbody>${sortedNames.map(name=>{const p=pm[name],c=cm[name],delta=(c&&p)?c.total-p.total:null;return `<tr><td class="name"><b>${escapeHtml(name)}</b></td><td>${p?('#'+p.rank):'<span class="archive-badge">Baru</span>'}</td><td>${c?('#'+c.rank):'<span class="inactive-badge">Tidak aktif</span>'}</td><td>${p?Number(p.total).toFixed(2):'-'}</td><td>${c?Number(c.total).toFixed(2):'-'}</td><td class="${delta===null?'':delta>0?'delta-up':delta<0?'delta-down':'delta-same'}">${delta===null?'–':(delta>=0?'+':'')+delta.toFixed(2)}</td><td>${c?`<span class="grade ${gradeClass(c.grade||calcGrade(c.total))}">${escapeHtml(c.grade||calcGrade(c.total))}</span>`:'-'}</td><td>${escapeHtml(c?.store||p?.store||'')}</td></tr>`;}).join('')}</tbody></table>`;
}
function buildSparkline(values){
  if(values.length < 2) return '';
  const w = 600, h = 60, pad = 6;
  const min = Math.min(...values), max = Math.max(...values);
  const range = (max - min) || 1;
  const stepX = (w - pad*2) / (values.length - 1);
  const pts = values.map((v,i)=>{
    const x = pad + i*stepX;
    const y = h - pad - ((v-min)/range)*(h-pad*2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const last = values[values.length-1] >= values[0] ? '#059669' : '#DC2626';
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    <polyline points="${pts.join(' ')}" fill="none" stroke="${last}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    ${pts.map((p,i)=>`<circle cx="${p.split(',')[0]}" cy="${p.split(',')[1]}" r="${i===pts.length-1?4:2.5}" fill="${last}"/>`).join('')}
  </svg>`;
}

const GRADE_ORDER = ['Perfect','Good','Need Improve','Bad','Poor'];
const GRADE_COLORS = {Perfect:'var(--g-perfect)',Good:'var(--g-good)','Need Improve':'var(--g-need)',Bad:'var(--g-bad)',Poor:'var(--g-poor)'};
function renderDashboardCharts(activeRows){
  const el = document.getElementById('dashboardCharts');
  if(!el) return;
  const dsv = getDashboardDataset();
  if(dsv.archive) activeRows = dsv.active;
  const chrono = [...historyData].sort((a,b)=>new Date(a.date)-new Date(b.date));
  const trendHtml = chrono.length>=2
    ? buildLineChartSvg(chrono.map(h=>h.label), [{name:'Rata-rata Poin', color:'#F5B400', values: chrono.map(h=>h.avg)}], {height:210})
    : '<div class="empty"><i class="ti ti-chart-line"></i>Belum cukup snapshot untuk menampilkan tren. Simpan snapshot harian untuk mulai melacak.</div>';
  const counts = {}; GRADE_ORDER.forEach(g=>counts[g]=0);
  (activeRows||[]).forEach(r=>{ const g=calcGrade(r.total); if(counts[g]!==undefined) counts[g]++; });
  const maxCount = Math.max(1, ...GRADE_ORDER.map(g=>counts[g]));
  const gradeBarsHtml = `<div class="grade-bar-chart">${GRADE_ORDER.map(g=>`
    <div class="grade-bar-row">
      <span class="grade-bar-label">${g}</span>
      <div class="grade-bar-track"><div class="grade-bar-fill" style="width:${(counts[g]/maxCount)*100}%;background:${GRADE_COLORS[g]}"></div></div>
      <span class="grade-bar-val">${counts[g]}</span>
    </div>`).join('')}</div>`;
  el.innerHTML = `<div class="chart-grid-2">
    <div><div class="chart-subtitle">Tren Rata-rata Poin (semua snapshot)</div>${trendHtml}</div>
    <div><div class="chart-subtitle">Distribusi Grade ERO Aktif${dsv.archive?' — '+escapeHtml(monthLabel(dsv.month)):''}</div>${gradeBarsHtml}</div>
  </div>`;
}

function buildTargetProgressHtml(r){
  const labels={device:'Device',acc:'Acc',operator:'Operator',boltech:'Boltech',arAcc:'AR Acc',arBoltech:'AR Boltech'};
  const est = r.est||{};
  const rowsHtml = fields.map(f=>{
    const ratio = parseFloat(est[f]);
    const hasVal = !isNaN(ratio) && isFinite(ratio);
    const pct = hasVal ? ratio*100 : 0;
    const clamped = Math.max(0, Math.min(100, pct));
    const cls = pct>=100 ? 'ontrack' : pct>=80 ? 'warn' : 'behind';
    return `<div class="target-progress-row">
      <div class="target-progress-head"><span>${labels[f]}</span><b class="tp-${cls}">${hasVal?pct.toFixed(0)+'%':'-'}</b></div>
      <div class="target-progress-track"><div class="target-progress-fill ${cls}" style="width:${clamped}%"></div></div>
    </div>`;
  }).join('');
  return `<div class="target-progress-wrap"><div class="target-progress-title"><i class="ti ti-target-arrow"></i>Target vs Pencapaian (% dari target)</div>${rowsHtml}</div>`;
}

/* ============ Target & pencapaian bulanan level Store ============
   Target store = total (jumlah) target dari seluruh ERO aktif di store tersebut.
   Pencapaian store = total pencapaian dari seluruh ERO aktif di store tersebut.
   Est% per indikator = total pencapaian / total target (setara rata-rata tertimbang). */
const STORE_TARGET_ACH_MAP = {device:'deviceVal', acc:'accVal', operator:'operator', boltech:'boltechVal', arAcc:'arAcc', arBoltech:'arBoltech'};
function computeStoreTargetAgg(storeName, sourceRows=rows){
  const members = sourceRows.filter(r=>isActive(r) && (r.store||'(Tanpa Store)')===storeName);
  const targetSum = {}, achSum = {};
  fields.forEach(f=>{ targetSum[f]=0; achSum[f]=0; });
  members.forEach(r=>{
    const t=r.target||{}, a=r.ach||{};
    fields.forEach(f=>{
      targetSum[f]+=Number(t[f])||0;
      achSum[f]+=Number(a[STORE_TARGET_ACH_MAP[f]])||0;
    });
  });
  const est={};
  fields.forEach(f=>{ est[f] = targetSum[f]>0 ? achSum[f]/targetSum[f] : null; });
  return {targetSum, achSum, est, count:members.length};
}
function buildStoreTargetProgressHtml(storeName, sourceRows=rows, monthLabelText=''){
  const agg = computeStoreTargetAgg(storeName, sourceRows);
  if(!agg.count) return '';
  const labels={device:'Device',acc:'Acc',operator:'Operator',boltech:'Boltech',arAcc:'AR Acc',arBoltech:'AR Boltech'};
  const rowsHtml = fields.map(f=>{
    const ratio = agg.est[f];
    const hasVal = ratio!==null && !isNaN(ratio) && isFinite(ratio);
    const pct = hasVal ? ratio*100 : 0;
    const clamped = Math.max(0, Math.min(100, pct));
    const cls = pct>=100 ? 'ontrack' : pct>=80 ? 'warn' : 'behind';
    return `<div class="target-progress-row">
      <div class="target-progress-head"><span>${labels[f]}</span><b class="tp-${cls}">${hasVal?pct.toFixed(0)+'%':'-'}</b></div>
      <div class="target-progress-track"><div class="target-progress-fill ${cls}" style="width:${clamped}%"></div></div>
    </div>`;
  }).join('');
  const achDisplay = {deviceVal:agg.achSum.device, accVal:agg.achSum.acc, operator:agg.achSum.operator, boltechVal:agg.achSum.boltech, arAcc:agg.achSum.arAcc, arBoltech:agg.achSum.arBoltech};
  return `<div class="target-progress-wrap"><div class="target-progress-title"><i class="ti ti-target-arrow"></i>Target &amp; Pencapaian Store${monthLabelText?` · ${escapeHtml(monthLabelText)}`:''} (total ${agg.count} ERO aktif)</div>${rowsHtml}
    <div class="archive-note" style="margin-top:12px;"><b>Total Target Store:</b> ${escapeHtml(fmtTarget(agg.targetSum))}<br><b>Total Pencapaian Store:</b> ${escapeHtml(fmtAchievement(achDisplay))}</div>
  </div>`;
}

function toggleSidebar(){
  const sidebar = document.getElementById('appSidebar');
  if(!sidebar) return;
  const collapsed = sidebar.classList.toggle('collapsed');
  localStorage.setItem('sidebarCollapsed', collapsed ? '1' : '0');
  updateSidebarToggleUI(collapsed);
}
function updateSidebarToggleUI(collapsed){
  const btn = document.getElementById('sidebarToggleBtn');
  if(!btn) return;
  const svgLeft = '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 6l-6 6 6 6"/><path d="M17 6l-6 6 6 6"/></svg>';
  const svgRight = '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 6l6 6-6 6"/><path d="M7 6l6 6-6 6"/></svg>';
  btn.innerHTML = collapsed
    ? svgRight+'<span class="nav-label">Perluas</span>'
    : svgLeft+'<span class="nav-label">Ciutkan</span>';
  btn.title = collapsed ? 'Perluas menu' : 'Ciutkan menu';
}
(function initSidebarState(){
  const collapsed = localStorage.getItem('sidebarCollapsed') === '1';
  document.addEventListener('DOMContentLoaded', ()=>{
    const sidebar = document.getElementById('appSidebar');
    if(sidebar && collapsed) sidebar.classList.add('collapsed');
    updateSidebarToggleUI(collapsed);
  });
})();
async function downloadFullBackup(btnEl){
  if(!isAdmin){ alert('Login sebagai admin terlebih dahulu.'); return; }
  if(!SUPABASE_READY){ alert('Supabase belum dikonfigurasi.'); return; }
  const btn = btnEl;
  if(btn){ btn.disabled = true; btn.innerHTML = '<i class="ti ti-loader"></i> Menyiapkan backup...'; }
  try{
    const {data: stateData, error: stateErr} = await sb.from('dashboard_state').select('*').eq('id',1).maybeSingle();
    if(stateErr) throw stateErr;

    let allHistory = []; let from = 0; const pageSize = 1000;
    while(true){
      const {data: page, error: pageErr} = await sb.from('rank_history').select('*').order('date',{ascending:true}).range(from, from+pageSize-1);
      if(pageErr) throw pageErr;
      if(!page || page.length===0) break;
      allHistory = allHistory.concat(page);
      if(page.length < pageSize) break;
      from += pageSize;
    }

    const backup = {
      exported_at: new Date().toISOString(),
      exported_by: currentUser?.email || 'Admin',
      dashboard_state: stateData || null,
      rank_history: allHistory,
      counts: { rank_history_rows: allHistory.length, dashboard_state_ero: stateData?.rows?.length || 0 }
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0,10);
    a.href = url; a.download = `BigMalang2-Backup-${dateStr}.json`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert(`Backup berhasil diunduh: ${allHistory.length} snapshot riwayat + data berjalan (${backup.counts.dashboard_state_ero} ERO). Simpan file ini di tempat aman (Google Drive/laptop) sebagai cadangan.`);
  } catch(err){
    alert('Gagal membuat backup: '+err.message);
  } finally {
    if(btn){ btn.disabled = false; btn.innerHTML = '<i class="ti ti-cloud-download"></i>Download Backup Lengkap'; }
  }
}
function exportExcel(){
  const withTotals = rows.filter(isActive).map((r,i)=>({...r, total: calcTotal(r), idx:i}));
  const sorted = [...withTotals].sort((a,b)=>b.total-a.total);
  const ranked = sorted.map((r,i)=>({...r, rank:i+1}));
  const filtered = ranked.filter(r=>(!filterStore || r.store===filterStore) && (!filterGrade || calcGrade(r.total)===filterGrade) && (!searchName || r.name.toLowerCase().includes(searchName))); 
  if(filtered.length===0){ alert('Tidak ada data untuk diexport.'); return; }
  const data = filtered.map(r=>({
    Rank: r.rank, Nama: r.name,
    ['Target Device']: r.target?.device||0, ['Target Acc']: r.target?.acc||0, ['Target Operator']: r.target?.operator||0, ['Target Boltech']: r.target?.boltech||0, ['Target AR Acc']: r.target?.arAcc||0, ['Target AR Boltech']: r.target?.arBoltech||0,
    ['Ach Device Qty']: r.ach?.deviceQty||0, ['Ach Device Val']: r.ach?.deviceVal||0, ['Ach Acc Qty']: r.ach?.accQty||0, ['Ach Acc Val']: r.ach?.accVal||0, ['Ach Operator']: r.ach?.operator||0, ['Ach Boltech Qty']: r.ach?.boltechQty||0, ['Ach Boltech Val']: r.ach?.boltechVal||0, ['Ach AR Acc']: r.ach?.arAcc||0, ['Ach AR Boltech']: r.ach?.arBoltech||0,
    Device: r.device, Acc: r.acc, Operator: r.operator, Boltech: r.boltech, ['AR Acc']: r.arAcc, ['AR Boltech']: r.arBoltech,
    ['Total Point']: Math.round(r.total*100)/100, Grade: calcGrade(r.total), Store: r.store||''
  }));
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Big Malang 2');
  const dateStr = new Date().toISOString().slice(0,10);
  XLSX.writeFile(wb, `BigMalang2-Laporan-${dateStr}.xlsx`);
}

function buildLineChartSvg(labels, series, opts={}){
  const w = 640, h = 220, padL = 34, padR = 12, padT = 14, padB = 34;
  const allVals = series.flatMap(s=>s.values.filter(v=>v!==null && v!==undefined));
  if(allVals.length===0) return '<div class="empty">Belum ada data untuk ditampilkan.</div>';
  const min = Math.min(0, Math.min(...allVals));
  const max = Math.max(...allVals) * 1.1 || 10;
  const stepX = (w - padL - padR) / Math.max(1, labels.length - 1);
  const xAt = i => padL + i*stepX;
  const yAt = v => padT + (h - padT - padB) * (1 - (v - min) / ((max - min) || 1));

  const gridLines = [0,0.25,0.5,0.75,1].map(t=>{
    const y = padT + (h-padT-padB)*t;
    const val = (max - (max-min)*t);
    return `<line x1="${padL}" y1="${y}" x2="${w-padR}" y2="${y}" stroke="#EEF2F7" stroke-width="1"/><text x="4" y="${y+3}" font-size="9" fill="#94A3B8">${val.toFixed(1)}</text>`;
  }).join('');

  const xLabels = labels.map((l,i)=>{
    if(labels.length>8 && i%Math.ceil(labels.length/8)!==0 && i!==labels.length-1) return '';
    return `<text x="${xAt(i)}" y="${h-10}" font-size="9" fill="#94A3B8" text-anchor="middle">${escapeHtml(String(l).slice(0,8))}</text>`;
  }).join('');

  const paths = series.map(s=>{
    let segments = [], current = [];
    s.values.forEach((v,i)=>{
      if(v===null || v===undefined){ if(current.length){ segments.push(current); current=[]; } return; }
      current.push(`${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`);
    });
    if(current.length) segments.push(current);
    const lines = segments.map(seg=>`<polyline points="${seg.join(' ')}" fill="none" stroke="${s.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
    const dots = s.values.map((v,i)=> (v===null||v===undefined) ? '' : `<circle cx="${xAt(i).toFixed(1)}" cy="${yAt(v).toFixed(1)}" r="3" fill="${s.color}"/>`).join('');
    return lines + dots;
  }).join('');

  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="width:100%;height:${opts.height||220}px;">${gridLines}${paths}${xLabels}</svg>`;
}

let historyData = [];

function hasSnapshotToday(){
  if(!historyData || !historyData.length) return false;
  const today = new Date(); today.setHours(0,0,0,0);
  return historyData.some(h=>{
    const d = new Date(h.date); if(isNaN(d)) return false;
    d.setHours(0,0,0,0);
    return d.getTime() === today.getTime();
  });
}
function updateSnapshotReminder(){
  const due = isAdmin && !hasSnapshotToday();
  const navBadge = document.getElementById('snapshotNavBadge');
  if(navBadge) navBadge.style.display = due ? 'block' : 'none';
  const banner = document.getElementById('snapshotReminderBanner');
  if(banner) banner.style.display = due ? 'flex' : 'none';
}

function getFocusRecommendation(r){
  const labels={device:'Device',acc:'Acc',operator:'Operator',boltech:'Boltech',arAcc:'AR Acc',arBoltech:'AR Boltech'};
  const weights={device:3,acc:3,operator:1,boltech:1,arAcc:1,arBoltech:1};
  const weak=fields.map(f=>({field:f,value:parseFloat(r[f])||0,max:weights[f]})).sort((a,b)=>(a.value/a.max)-(b.value/b.max));
  const w=weak[0];
  if((w.value/w.max)>=0.8) return 'Pertahankan performa. Fokus berikutnya adalah menjaga konsistensi semua indikator.';
  return `Fokus utama: ${labels[w.field]}. Pencapaian ${w.value.toFixed(1)} dari ${w.max}. Prioritaskan coaching dan pendampingan pada indikator ini.`;
}
function openPersonModal(name){
  if(!name) return;
  const current = rows.find(r=>r.name===name);
  document.getElementById('personModalName').textContent = name;
  document.getElementById('personModalStore').textContent = current ? (current.store||'-') : '-';
  const chrono = [...historyData].reverse();
  const points = [];
  chrono.forEach(h=>{
    if(!h.rows_snapshot) return;
    const match = h.rows_snapshot.find(r=>r.name===name);
    if(match) points.push({label:h.label,total:match.total,grade:match.grade});
  });
  const chartEl=document.getElementById('personModalChart'), listEl=document.getElementById('personModalList');
  if(current){
    const labels={device:'Device',acc:'Acc',operator:'Operator',boltech:'Boltech',arAcc:'AR Acc',arBoltech:'AR Boltech'};
    const maxes={device:3,acc:3,operator:1,boltech:1,arAcc:1,arBoltech:1};
    const total=calcTotal(current), grade=calcGrade(total), focus=getFocusRecommendation(current);
    const rank=getRankedRows(rows).findIndex(r=>r.name===name)+1;
    const breakdown=`<div class="modal-breakdown">${fields.map(f=>`<div class="break-row"><span>${labels[f]}</span><div class="break-track"><div class="break-fill" style="width:${Math.min(100,((parseFloat(current[f])||0)/maxes[f])*100)}%"></div></div><b>${(parseFloat(current[f])||0).toFixed(1)}/${maxes[f]}</b></div>`).join('')}</div><div class="archive-note"><b>Target:</b> ${escapeHtml(fmtTarget(current.target))}<br><b>Achievement:</b> ${escapeHtml(fmtAchievement(current.ach))}</div>`;
    const kpis=`<div class="modal-kpis"><div class="modal-kpi"><b>${total.toFixed(2)}</b><span>Total</span></div><div class="modal-kpi"><b>#${rank}</b><span>Ranking</span></div><div class="modal-kpi"><b>${grade}</b><span>Grade</span></div></div>`;
    const focusBox=`<div class="focus-box"><b>Rekomendasi fokus utama</b><div>${escapeHtml(focus)}</div></div>`;
    const targetProgress=buildTargetProgressHtml(current);
    chartEl.innerHTML=kpis+breakdown+targetProgress+focusBox+(points.length>=2?buildLineChartSvg(points.map(p=>p.label),[{name, color:'#CA8A04', values:points.map(p=>p.total)}],{height:200}):'');
  } else chartEl.innerHTML='';
  if(points.length===0) listEl.innerHTML='<div class="empty"><i class="ti ti-chart-line"></i>Belum ada data histori untuk orang ini.</div>';
  else {
    window._phPoints=[...points].reverse();
    window._phExpanded=!!window._phExpanded && window._phPoints.length>0;
    const renderPH=()=>{
      const all=window._phPoints, LIM=8, show=window._phExpanded?all:all.slice(0,LIM);
      const rows=show.map(p=>`<div class="hist-row"><span class="hist-date">${escapeHtml(p.label)}</span><span class="hist-meta"><b class="hist-pt">${p.total.toFixed(2)}</b><span class="grade ${String(p.grade).toLowerCase().replace(/\s+/g,'')}">${escapeHtml(p.grade)}</span></span></div>`).join('');
      const more=all.length>LIM?`<button class="hist-toggle" onclick="window._phExpanded=!window._phExpanded;window._phRender&&window._phRender()">${window._phExpanded?'Tutup':'Lihat semua ('+all.length+')'}</button>`:'';
      listEl.innerHTML=rows+more;
    };
    window._phRender=renderPH;
    window._phExpanded=false;
    renderPH();
  }
  document.getElementById('personModal').style.display='flex';
}
function closePersonModal(){ document.getElementById('personModal').style.display = 'none'; }

let currentStoreModalName = '';
let currentStoreModalMonth = 'current';
let storePerformanceMonth = 'current';

function getCurrentMonthKey(){
  const d=new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
}
function getStoreMonthOptions(){
  const options=[{key:'current',label:`Bulan berjalan (${monthLabel(getCurrentMonthKey())})`}];
  const seen=new Set(['current']);
  [...(historyData||[])].sort((a,b)=>new Date(b.date)-new Date(a.date)).forEach(h=>{
    const key=archiveMonthFromSnapshot(h);
    if(key && !seen.has(key)){
      seen.add(key);
      options.push({key,label:monthLabel(key)});
    }
  });
  return options;
}
function getStoreRowsForMonth(monthKey){
  if(monthKey==='current') return rows;
  const snaps=(historyData||[]).filter(h=>archiveMonthFromSnapshot(h)===monthKey && Array.isArray(h.rows_snapshot));
  if(!snaps.length) return [];
  const latest=snaps.sort((a,b)=>new Date(b.date)-new Date(a.date))[0];
  return latest.rows_snapshot.map(r=>({...r,active:r.active!==false,target:r.target||{},ach:r.ach||{},est:r.est||{}}));
}
function getStorePerformanceMonthOptions(){
  return getStoreMonthOptions();
}
function renderStorePerformanceMonthFilter(){
  const el=document.getElementById('storePerformanceMonthFilter');
  if(!el)return;
  const options=getStorePerformanceMonthOptions();
  if(!options.some(o=>o.key===storePerformanceMonth))storePerformanceMonth='current';
  el.innerHTML=`<label><i class="ti ti-calendar"></i> Bulan</label><select id="storePerformanceMonthSelect" onchange="changeStorePerformanceMonth(this.value)">${options.map(o=>`<option value="${escapeAttr(o.key)}" ${o.key===storePerformanceMonth?'selected':''}>${escapeHtml(o.label)}</option>`).join('')}</select>`;
}
function changeStorePerformanceMonth(monthKey){
  storePerformanceMonth=monthKey||'current';
  render();
}
function getStorePerformanceRows(){
  return getStoreRowsForMonth(storePerformanceMonth);
}

function renderStoreModalForMonth(){
  const storeName=currentStoreModalName;
  const monthOptions=getStoreMonthOptions();
  if(!monthOptions.some(o=>o.key===currentStoreModalMonth)) currentStoreModalMonth='current';
  const sourceRows=getStoreRowsForMonth(currentStoreModalMonth);
  const members=sourceRows.filter(r=>(r.store||'(Tanpa Store)')===storeName && isActive(r))
    .map(r=>({...r,total:Number.isFinite(Number(r.total))?Number(r.total):calcTotal(r)}))
    .sort((a,b)=>b.total-a.total);
  const avg=members.length?members.reduce((s,r)=>s+r.total,0)/members.length:0;
  const monthText=monthOptions.find(o=>o.key===currentStoreModalMonth)?.label||'Bulan berjalan';
  const filterEl=document.getElementById('storeModalMonthFilter');
  if(filterEl){
    filterEl.innerHTML=`<label><i class="ti ti-calendar"></i> Bulan data</label><select id="storeModalMonthSelect" onchange="changeStoreModalMonth(this.value)">${monthOptions.map(o=>`<option value="${escapeAttr(o.key)}" ${o.key===currentStoreModalMonth?'selected':''}>${escapeHtml(o.label)}</option>`).join('')}</select>`;
  }
  document.getElementById('storeModalSub').textContent = members.length
    ? `${members.length} ERO · Rata-rata poin ${avg.toFixed(2)} · ${monthText}`
    : `Belum ada ERO tercatat untuk store ini pada ${monthText}.`;
  const targetProgress=document.getElementById('storeModalTargetProgress');
  if(targetProgress) targetProgress.innerHTML=buildStoreTargetProgressHtml(storeName,sourceRows,monthText);
  const list=document.getElementById('storeModalList');
  if(!members.length){
    list.innerHTML='<div class="empty"><i class="ti ti-users"></i>Belum ada data ERO untuk bulan yang dipilih.</div>';
  } else {
    list.innerHTML=members.map((r,i)=>{
      const grade=calcGrade(r.total), gc=gradeClass(grade);
      return `<div class="modal-list-item"><span class="clickable-name" data-name="${escapeAttr(r.name)}" onclick="closeStoreModal();openPersonModal(this.dataset.name)">${i+1}. ${escapeHtml(r.name)}</span><span><span class="grade ${gc}" style="margin-right:10px;">${grade}</span><b>${r.total.toFixed(2)}</b></span></div>`;
    }).join('');
  }
}
function changeStoreModalMonth(monthKey){
  currentStoreModalMonth=monthKey||'current';
  renderStoreModalForMonth();
}
function openStoreModal(storeName){
  if(!storeName)return;
  currentStoreModalName=storeName;
  currentStoreModalMonth='current';
  document.getElementById('storeModalName').innerHTML=`<i class="ti ti-building-store"></i> ${escapeHtml(storeName)}`;
  renderStoreModalForMonth();
  document.getElementById('storeModal').style.display='flex';
}
function closeStoreModal(){ document.getElementById('storeModal').style.display = 'none'; }

const STORE_COMPARE_COLORS = ['#2563EB','#059669','#F59E0B','#DC2626','#7C3AED'];
let selectedCompareStores = [];

function renderStoreCompareControls(){
  const controlsEl = document.getElementById('storeCompareControls');
  if(!controlsEl) return;
  const allStores = [...new Set(rows.filter(isActive).map(r=>r.store).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
  if(selectedCompareStores.length===0){
    const countByStore = {};
    rows.filter(isActive).forEach(r=>{ if(r.store) countByStore[r.store]=(countByStore[r.store]||0)+1; });
    selectedCompareStores = allStores.slice().sort((a,b)=>(countByStore[b]||0)-(countByStore[a]||0)).slice(0,3);
  }
  controlsEl.innerHTML = allStores.map(s=>{
    const active = selectedCompareStores.includes(s);
    return `<span class="store-chip ${active?'active':''}" data-store="${escapeAttr(s)}" onclick="toggleCompareStore(this.dataset.store)">${escapeHtml(s)}</span>`;
  }).join('');
  renderStoreCompareChart();
}
function toggleCompareStore(store){
  const idx = selectedCompareStores.indexOf(store);
  if(idx>-1){ selectedCompareStores.splice(idx,1); }
  else {
    if(selectedCompareStores.length>=5){ alert('Maksimal 5 store untuk dibandingkan sekaligus.'); return; }
    selectedCompareStores.push(store);
  }
  renderStoreCompareControls();
}
function renderStoreCompareChart(){
  const chartEl = document.getElementById('storeCompareChart');
  if(!chartEl) return;
  const snaps = [...getFilteredHistory()].reverse().filter(h=>h.rows_snapshot && h.rows_snapshot.length);
  if(snaps.length < 2 || selectedCompareStores.length===0){
    chartEl.innerHTML = '<div class="empty"><i class="ti ti-chart-line"></i>Perlu minimal 2 snapshot dengan detail data (dan minimal 1 store dipilih) untuk membandingkan tren.</div>';
    return;
  }
  const series = selectedCompareStores.map((store,i)=>{
    const values = snaps.map(h=>{
      const matches = h.rows_snapshot.filter(r=>r.store===store);
      if(!matches.length) return null;
      return matches.reduce((s,r)=>s+r.total,0)/matches.length;
    });
    return { name: store, color: STORE_COMPARE_COLORS[i % STORE_COMPARE_COLORS.length], values };
  });
  const chartHtml = buildLineChartSvg(snaps.map(h=>h.label), series, {height:260});
  const legendHtml = `<div class="store-compare-legend">${series.map(s=>`<span><i style="background:${s.color}"></i>${escapeHtml(s.name)}</span>`).join('')}</div>`;
  chartEl.innerHTML = chartHtml + legendHtml;
}

function gradeCountsChips(rowsSnap){
  if(!rowsSnap || !rowsSnap.length) return '';
  const order = ['Perfect','Good','Need Improve','Bad','Poor'];
  const colors = {Perfect:'#059669',Good:'#84CC16',['Need Improve']:'#F59E0B',Bad:'#F97316',Poor:'#DC2626'};
  const textColors = {Perfect:'#FFFFFF',Good:'#1A2E05',['Need Improve']:'#3B2504',Bad:'#FFFFFF',Poor:'#FFFFFF'};
  const counts = {}; order.forEach(g=>counts[g]=0);
  rowsSnap.forEach(r=>{ if(counts[r.grade]!==undefined) counts[r.grade]++; });
  return `<div class="snap-grade-row">` + order.map(g=>`<span class="snap-grade-chip" style="background:${colors[g]};color:${textColors[g]}">${g}: ${counts[g]}</span>`).join('') + `</div>`;
}
function moversHtml(currentSnap, prevSnap){
  if(!currentSnap || !prevSnap || !currentSnap.length || !prevSnap.length){
    return '<div class="snap-nodetail">Data pembanding belum tersedia untuk snapshot sebelumnya.</div>';
  }
  const prevRankMap = {}; prevSnap.forEach(r=>{ prevRankMap[r.name] = r.rank; });
  let gainer=null, dropper=null;
  currentSnap.forEach(r=>{
    if(!Object.prototype.hasOwnProperty.call(prevRankMap, r.name)) return;
    const delta = prevRankMap[r.name] - r.rank;
    if(delta > 0 && (!gainer || delta > gainer.delta)) gainer = {name:r.name, delta};
    if(delta < 0 && (!dropper || delta < dropper.delta)) dropper = {name:r.name, delta};
  });
  return `<div class="snap-movers">
    <div class="snap-mover-card gain"><div class="mv-lbl">Top Gainer</div><div class="mv-name">${gainer?escapeHtml(gainer.name):'–'}</div><div class="mv-delta">${gainer?('▲ naik '+gainer.delta+' peringkat'):'Tidak ada perubahan naik'}</div></div>
    <div class="snap-mover-card drop"><div class="mv-lbl">Top Dropper</div><div class="mv-name">${dropper?escapeHtml(dropper.name):'–'}</div><div class="mv-delta">${dropper?('▼ turun '+Math.abs(dropper.delta)+' peringkat'):'Tidak ada perubahan turun'}</div></div>
  </div>`;
}

function getFilteredHistory(){
  let h=[...historyData];
  if(dateFrom){const d=new Date(dateFrom+'T00:00:00'); h=h.filter(x=>new Date(x.date)>=d);}
  if(dateTo){const d=new Date(dateTo+'T23:59:59'); h=h.filter(x=>new Date(x.date)<=d);}
  return h;
}
function applyDateFilter(){ dateFrom=document.getElementById('dateFrom')?.value||''; dateTo=document.getElementById('dateTo')?.value||''; filteredHistoryData=getFilteredHistory(); renderHistory(filteredHistoryData); renderStoreCompareChart(); renderYesterdayToday(); renderMoversPanel(); }
function setDateRange(days){const end=new Date(); const start=new Date(); start.setDate(end.getDate()-days+1); document.getElementById('dateFrom').value=start.toISOString().slice(0,10); document.getElementById('dateTo').value=end.toISOString().slice(0,10); applyDateFilter();}
function clearDateFilter(){dateFrom='';dateTo='';document.getElementById('dateFrom').value='';document.getElementById('dateTo').value='';applyDateFilter();}
function renderYesterdayToday(){
  const el=document.getElementById('yesterdayToday'); if(!el)return;
  const h=getFilteredHistory();
  if(h.length<2){el.innerHTML='<div class="empty">Minimal 2 snapshot diperlukan untuk perbandingan.</div>';return;}
  const chrono=[...h].sort((a,b)=>new Date(a.date)-new Date(b.date)); const prev=chrono[chrono.length-2], cur=chrono[chrono.length-1]; const d=cur.avg-prev.avg; const pct=prev.avg?d/prev.avg*100:0;
  const curMap={};(cur.rows_snapshot||[]).forEach(r=>curMap[r.name]=r); const prevMap={};(prev.rows_snapshot||[]).forEach(r=>prevMap[r.name]=r);
  let improved=0,declined=0;Object.keys(curMap).forEach(n=>{if(prevMap[n]){if(curMap[n].rank<prevMap[n].rank)improved++;else if(curMap[n].rank>prevMap[n].rank)declined++;}});
  el.innerHTML=`<div class="insight-card"><h3>${escapeHtml(prev.label)}</h3><div class="big">${prev.avg.toFixed(2)}</div><div class="muted">Snapshot sebelumnya</div></div><div class="insight-card ${d>=0?'gain':'drop'}"><h3>${escapeHtml(cur.label)}</h3><div class="big">${cur.avg.toFixed(2)} ${d>=0?'▲':'▼'} ${Math.abs(d).toFixed(2)}</div><div class="muted">${d>=0?'+':''}${pct.toFixed(1)}% · ${improved} ERO naik rank · ${declined} turun rank</div></div>`;
}
async function exportStorePerformanceImage(){
  const sourceRows = getStorePerformanceRows();
  const active = sourceRows.filter(isActive)
    .map(r=>({...r,total:Number.isFinite(Number(r.total))?Number(r.total):calcTotal(r)}))
    .sort((a,b)=>b.total-a.total || String(a.name||'').localeCompare(String(b.name||'')));
  if(!active.length){ alert('Belum ada data ERO aktif untuk bulan yang dipilih.'); return; }

  const options = getStorePerformanceMonthOptions();
  const monthText = options.find(o=>o.key===storePerformanceMonth)?.label || 'Bulan berjalan';
  const capture = document.getElementById('storePerformanceCapture') || (()=>{
    const d=document.createElement('div'); d.id='storePerformanceCapture'; document.body.appendChild(d); return d;
  })();
  const generatedAt = new Date().toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'});
  const pointFields = [
    ['Device','device'],['Acc','acc'],['Operator','operator'],['Boltech','boltech'],['AR Acc','arAcc'],['AR Boltech','arBoltech']
  ];
  const rowsHtml = active.map((r,i)=>{
    const grade=calcGrade(r.total);
    const points=pointFields.map(([label,f])=>`${label}: ${Number(r[f])||0}`).join(' · ');
    return `<tr>
      <td class="rank">${i+1}</td>
      <td><b>${escapeHtml(r.name||'-')}</b></td>
      <td>${escapeHtml(r.store||'(Tanpa Store)')}</td>
      <td class="score">${r.total.toFixed(2)}</td>
      <td class="grade">${escapeHtml(grade)}</td>
      <td class="points">${escapeHtml(points)}</td>
    </tr>`;
  }).join('');
  const avg=active.reduce((sum,r)=>sum+r.total,0)/active.length;
  const goodPlus=active.filter(r=>['Perfect','Good'].includes(calcGrade(r.total))).length;
  capture.innerHTML=`<div class="capture-title">Store Performance Score — Ranking ERO</div>
    <div class="capture-sub">Periode: <b>${escapeHtml(monthText)}</b> · ${active.length} ERO aktif · Rata-rata: <b>${avg.toFixed(2)}</b> · Good+: <b>${(goodPlus/active.length*100).toFixed(0)}%</b></div>
    <table><thead><tr><th class="rank">Rank</th><th>ERO</th><th>Store</th><th class="score">Score</th><th>Grade</th><th>Point per Category</th></tr></thead><tbody>${rowsHtml}</tbody></table>
    <div class="capture-footer"><span>Export Analisis · ${escapeHtml(monthText)}</span><span>Dibuat ${escapeHtml(generatedAt)}</span></div>`;

  // Pastikan browser sudah menghitung layout sebelum screenshot.
  await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  const canvas = await html2canvas(capture,{backgroundColor:'#ffffff',scale:2,useCORS:true,logging:false,windowWidth:1200});
  const filename = `Store-Performance-Ranking-${String(monthText).replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'')}.png`;

  const blob = await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
  if(!blob){ alert('Gagal membuat gambar analisis. Silakan coba lagi.'); return; }
  const file = new File([blob],filename,{type:'image/png'});

  try{
    if(navigator.share && navigator.canShare && navigator.canShare({files:[file]})){
      await navigator.share({title:`Store Performance Score — ${monthText}`,text:`Ranking ERO · ${monthText}`,files:[file]});
      return;
    }
  }catch(err){
    if(err && err.name==='AbortError') return;
  }

  const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download=filename; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  alert('Gambar ranking berhasil dibuat dan diunduh. Di HP, buka file PNG tersebut lalu pilih Share untuk mengirim ke WhatsApp/Telegram.');
}

function renderStoreScore(storeRows){
  const el=document.getElementById('storeScoreGrid'); if(!el)return; if(!storeRows.length){el.innerHTML='<div class="empty">Belum ada data store.</div>';return;}
  el.innerHTML=storeRows.map(s=>{const score=Math.max(0,Math.min(100,s.avg*10)); const goodPlus=(s.Perfect+s.Good)/s.count*100; return `<div class="score-card" data-store="${escapeAttr(s.store)}" onclick="openStoreModal(this.dataset.store)"><div class="score-head"><div class="score-name clickable-name">${escapeHtml(s.store)}</div><div class="score-value">${score.toFixed(0)}</div></div><div class="score-bar"><span style="width:${score}%"></span></div><div class="score-meta"><span>Avg ${s.avg.toFixed(2)}</span><span>Good+ ${goodPlus.toFixed(0)}%</span></div><div class="score-hint"><i class="ti ti-eye"></i>Lihat detail ERO</div></div>`;}).join('');
}
function renderMoversPanel(){
  const el=document.getElementById('moversPanel'); if(!el)return; const h=getFilteredHistory(); if(h.length<2){el.innerHTML='<div class="empty">Minimal 2 snapshot diperlukan.</div>';return;}
  const chrono=[...h].sort((a,b)=>new Date(a.date)-new Date(b.date)); const prev=chrono[chrono.length-2],cur=chrono[chrono.length-1]; if(!prev.rows_snapshot||!cur.rows_snapshot){el.innerHTML='<div class="empty">Snapshot detail per-orang belum tersedia.</div>';return;}
  const pm={};prev.rows_snapshot.forEach(r=>pm[r.name]=r.rank); const moves=cur.rows_snapshot.map(r=>({name:r.name,delta:(pm[r.name]??r.rank)-r.rank})).filter(r=>r.delta!==0); const gains=moves.filter(x=>x.delta>0).sort((a,b)=>b.delta-a.delta).slice(0,3),drops=moves.filter(x=>x.delta<0).sort((a,b)=>a.delta-b.delta).slice(0,3);
  const list=(arr,up)=>arr.length?`<div class="mover-list">${arr.map(x=>`<div class="mover-row"><span class="nm">${escapeHtml(x.name)}</span><span class="delta">${up?'▲ +':'▼ '}${up?x.delta:Math.abs(x.delta)} rank</span></div>`).join('')}</div>`:'<div class="empty">Tidak ada perubahan.</div>';
  el.innerHTML=`<div class="insight-card gain"><h3>📈 Most Improved</h3>${list(gains,true)}</div><div class="insight-card drop"><h3>📉 Biggest Drop</h3>${list(drops,false)}</div>`;
}
function renderAlerts(withTotals,sorted){
  const el=document.getElementById('alertPanel');if(!el)return; const alerts=[]; const poor=withTotals.filter(r=>calcGrade(r.total)==='Poor'), bad=withTotals.filter(r=>calcGrade(r.total)==='Bad');
  if(poor.length) alerts.push({c:'critical',icon:'ti-alert-triangle',t:`${poor.length} ERO berada di kategori Poor`,d:'Prioritaskan coaching dan pendampingan pada ERO dengan skor terendah.'});
  if(bad.length) alerts.push({c:'warning',icon:'ti-alert-circle',t:`${bad.length} ERO berada di kategori Bad`,d:'Review indikator terendah dan buat action plan.'});
  const h=getFilteredHistory(); if(h.length>=2){const ch=[...h].sort((a,b)=>new Date(a.date)-new Date(b.date)); const d=ch.at(-1).avg-ch.at(-2).avg;if(d<0)alerts.push({c:'critical',icon:'ti-trending-down',t:`Rata-rata turun ${Math.abs(d).toFixed(2)} poin`,d:'Bandingkan store dan ERO yang mengalami penurunan terbesar.'});else if(d>0)alerts.push({c:'good',icon:'ti-trending-up',t:`Rata-rata naik ${d.toFixed(2)} poin`,d:'Pertahankan praktik yang membuat performa meningkat.'});}
  if(!alerts.length)alerts.push({c:'good',icon:'ti-circle-check',t:'Tidak ada alert kritis',d:'Performance saat ini tidak memunculkan kondisi yang perlu perhatian khusus.'});
  el.innerHTML=alerts.map(a=>`<div class="alert-item ${a.c}"><i class="ti ${a.icon}"></i><div><strong>${a.t}</strong><div>${a.d}</div></div></div>`).join('');
  const m=document.getElementById('mAlerts');if(m)m.textContent=alerts.filter(a=>a.c==='critical'||a.c==='warning').length;
}
function renderMobileLeader(withTotals){const m=document.getElementById('mCount');if(!m)return;document.getElementById('mCount').textContent=withTotals.length;document.getElementById('mAvg').textContent=withTotals.length?(withTotals.reduce((s,r)=>s+r.total,0)/withTotals.length).toFixed(2):'0';const h=getFilteredHistory();let imp=0;if(h.length>=2&&h.at(-1).rows_snapshot&&h.at(-2).rows_snapshot){const pm={};h.at(-2).rows_snapshot.forEach(r=>pm[r.name]=r.rank);h.at(-1).rows_snapshot.forEach(r=>{if(pm[r.name]&&r.rank<pm[r.name])imp++;});}document.getElementById('mImproved').textContent=imp;const focus=withTotals.filter(r=>calcGrade(r.total)==='Poor'||calcGrade(r.total)==='Bad').sort((a,b)=>a.total-b.total).slice(0,2);document.getElementById('mFocus').textContent=focus.length?focus.map(r=>`${r.name} (${r.total.toFixed(2)})`).join(' · '):'Tidak ada ERO kritis saat ini.';}
function renderHistory(history){
  filteredHistoryData = history || [];
  const el = document.getElementById('history');
  const summaryEl = document.getElementById('historySummary');
  const trendEl = document.getElementById('historyTrend');
  if(!history || history.length===0){
    el.innerHTML = '<div class="empty"><i class="ti ti-timeline"></i>Belum ada snapshot. Klik "Simpan snapshot hari ini" untuk mulai melacak progres.</div>';
    summaryEl.innerHTML = ''; trendEl.innerHTML = '';
    return;
  }
  const chrono = [...history].reverse();

  const firstAvg = chrono[0].avg, lastAvg = chrono[chrono.length-1].avg;
  const overallDelta = Math.round((lastAvg-firstAvg)*100)/100;
  summaryEl.innerHTML = `<div class="history-summary">
    <div><b>${chrono.length}</b> snapshot tercatat</div>
    <div>Rata-rata pertama: <b>${firstAvg.toFixed(2)}</b></div>
    <div>Rata-rata terakhir: <b>${lastAvg.toFixed(2)}</b></div>
    <div>Perubahan keseluruhan: <b style="color:${overallDelta>=0?'#15803D':'#B91C1C'}">${overallDelta>=0?'+':''}${overallDelta.toFixed(2)}</b></div>
  </div>`;

  trendEl.innerHTML = chrono.length >= 2 ? `<div class="sparkline-wrap">${buildSparkline(chrono.map(h=>h.avg))}</div>` : '';

  el.innerHTML = chrono.map((h,idx)=>{
    const prev = idx>0 ? chrono[idx-1] : null;
    let trendHtml = '';
    if(prev){
      const d = Math.round((h.avg - prev.avg)*100)/100;
      const cls = d>0?'up':d<0?'down':'same';
      trendHtml = `<span class="snap-trend ${cls}">${d>0?'▲':d<0?'▼':'–'} ${Math.abs(d).toFixed(2)}</span>`;
    }
    const hasDetail = h.rows_snapshot && h.rows_snapshot.length;
    const detailBody = hasDetail
      ? gradeCountsChips(h.rows_snapshot) + moversHtml(h.rows_snapshot, prev?.rows_snapshot)
      : '<div class="snap-nodetail">Snapshot ini belum menyimpan detail per-orang.</div>';
    const metaRows = [];
    if(h.file_name) metaRows.push(`<div class="modal-list-item"><span>File</span><span>${escapeHtml(h.file_name)}</span></div>`);
    if(h.uploaded_by) metaRows.push(`<div class="modal-list-item"><span>Diupload oleh</span><span>${escapeHtml(h.uploaded_by)}</span></div>`);
    if(h.best_store) metaRows.push(`<div class="modal-list-item"><span>Store terbaik</span><span>${escapeHtml(h.best_store)}${h.best_store_avg!=null?' ('+Number(h.best_store_avg).toFixed(2)+')':''}</span></div>`);
    if(h.worst_store) metaRows.push(`<div class="modal-list-item"><span>Store terendah</span><span>${escapeHtml(h.worst_store)}${h.worst_store_avg!=null?' ('+Number(h.worst_store_avg).toFixed(2)+')':''}</span></div>`);
    const metaBlock = metaRows.length ? `<div class="snap-meta">${metaRows.join('')}</div>` : '';
    return `<div class="snap-item">
      <div class="snap-top">
        <div>
          <div class="snap-label">${escapeHtml(h.label)}</div>
          <div class="snap-detail"><i class="ti ti-medal" style="color:#CA8A04; vertical-align:-2px;"></i> ${escapeHtml(h.top)} (${h.top_pt.toFixed(2)}) &nbsp;&middot;&nbsp; <i class="ti ti-alert-triangle" style="color:#DC2626; vertical-align:-2px;"></i> ${escapeHtml(h.bottom)} (${h.bottom_pt.toFixed(2)})</div>
        </div>
        <div class="snap-avg-wrap">
          ${trendHtml}
          <div class="snap-avg">${h.avg.toFixed(2)}</div>
        </div>
      </div>
      <details>
        <summary class="snap-toggle">Lihat detail (${h.count} orang)</summary>
        <div class="snap-body">${metaBlock}${detailBody}</div>
      </details>
    </div>`;
  }).join('');
}

const HISTORY_FETCH_LIMIT = 500; // ~1.5 tahun snapshot harian. Naikkan lagi jika suatu saat banner peringatan muncul.
function renderHistoryLimitBanner(count){
  const el=document.getElementById('historyLimitBanner'); if(!el)return;
  if(count>=HISTORY_FETCH_LIMIT){
    el.innerHTML=`<div class="empty" style="text-align:left; background:#FFFBEB; border:1px solid #FDE68A; border-radius:10px; padding:12px 14px; margin-bottom:14px;"><i class="ti ti-alert-triangle" style="color:#D97706;"></i> Jumlah snapshot sudah mencapai batas pengambilan saat ini (${HISTORY_FETCH_LIMIT}). Snapshot yang lebih lama dari ini <b>tidak ikut ditampilkan</b> di grafik tren &amp; perbandingan. Beri tahu saya kalau ini terjadi supaya batasnya bisa dinaikkan lagi.</div>`;
  } else {
    el.innerHTML='';
  }
}
async function loadHistory(){
  if(!SUPABASE_READY){historyData=[];filteredHistoryData=[];renderHistory([]);renderStoreCompareControls();renderYesterdayToday();renderMoversPanel();renderMonthlyCompare();renderDashboardCharts(lastWithTotals.filter(isActive));updateSnapshotReminder();return;}
  const {data,error}=await sb.from('rank_history').select('*').order('date',{ascending:false}).limit(HISTORY_FETCH_LIMIT);
  if(error){console.error(error);historyData=[];filteredHistoryData=[];renderHistory([]);renderStoreCompareControls();renderYesterdayToday();renderMoversPanel();renderMonthlyCompare();renderDashboardCharts(lastWithTotals.filter(isActive));updateSnapshotReminder();return;}
  historyData=data||[];filteredHistoryData=getFilteredHistory();renderHistory(filteredHistoryData);renderStoreCompareControls();renderYesterdayToday();renderMoversPanel();renderMonthlyCompare();renderDashboardCharts(lastWithTotals.filter(isActive));updateSnapshotReminder();renderHistoryLimitBanner(historyData.length);
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function escapeAttr(s){ return escapeHtml(s); }

function unlockView(){
  document.body.classList.remove('gated');
}
async function submitViewGate(){
  if(!SUPABASE_READY){ document.getElementById('viewGateError').textContent='Supabase belum dikonfigurasi.'; document.getElementById('viewGateError').style.display='block'; return; }
  const email = document.getElementById('viewGateEmail').value.trim();
  const password = document.getElementById('viewGatePassword').value;
  const errEl = document.getElementById('viewGateError');
  const btn = document.getElementById('viewGateSubmit');
  if(!email || !password){ errEl.textContent='Email dan password wajib diisi.'; errEl.style.display='block'; return; }
  btn.disabled = true; btn.textContent = 'Memproses...';
  const {data,error} = await sb.auth.signInWithPassword({email,password});
  btn.disabled = false; btn.textContent = 'Masuk';
  if(error){ errEl.textContent = 'Login gagal: '+error.message; errEl.style.display='block'; return; }
  currentUser = data.user; isAdmin = isAdminFromUser(currentUser);
  unlockView();
  bootApp();
}
// =========================================
// ANALISIS PROGRES — LOGIKA BARU
// =========================================
let cmpMode = 'store-time';
let cmpPeriod = 30;
let cmpViewType = 'trend'; // 'trend' | 'period'
let cmpPreset = 'week'; // 'week' | 'month' | 'custom'

function setCmpMode(mode) {
  cmpMode = mode;
  document.querySelectorAll('[data-cmp-mode]').forEach(t => t.classList.toggle('active', t.dataset.cmpMode === mode));
  renderCompareView();
}

function setCmpPeriod(days) {
  cmpPeriod = days;
  document.querySelectorAll('.cmp-period-btn[data-period]').forEach(b => b.classList.toggle('active', Number(b.dataset.period) === days));
  renderCompareView();
}

function setCmpViewType(type) {
  cmpViewType = type;
  document.querySelectorAll('[data-cmp-viewtype]').forEach(b => b.classList.toggle('active', b.dataset.cmpViewtype === type));
  const trendEl = document.getElementById('cmpTrendControls');
  const periodEl = document.getElementById('cmpPeriodControls');
  const customEl = document.getElementById('cmpCustomDateRow');
  const hintEl = document.getElementById('cmpCustomHint');
  if (trendEl) trendEl.style.display = type === 'trend' ? 'flex' : 'none';
  if (periodEl) periodEl.style.display = type === 'period' ? 'flex' : 'none';
  const showCustom = type === 'period' && cmpPreset === 'custom';
  if (customEl) customEl.style.display = showCustom ? 'flex' : 'none';
  if (hintEl) hintEl.style.display = showCustom ? 'block' : 'none';
  renderCompareView();
}

function setCmpPreset(preset) {
  cmpPreset = preset;
  document.querySelectorAll('.cmp-period-btn[data-preset]').forEach(b => b.classList.toggle('active', b.dataset.preset === preset));
  const customEl = document.getElementById('cmpCustomDateRow');
  const hintEl = document.getElementById('cmpCustomHint');
  const showCustom = preset === 'custom';
  if (customEl) customEl.style.display = showCustom ? 'flex' : 'none';
  if (hintEl) hintEl.style.display = showCustom ? 'block' : 'none';
  if (preset === 'custom') {
    const af = document.getElementById('cmpAFrom'), bf = document.getElementById('cmpBFrom');
    if (af && bf && !af.value && !bf.value) {
      const wa = getWeekRange(0), wb = getWeekRange(-1);
      document.getElementById('cmpAFrom').value = toDateInput(wa.start);
      document.getElementById('cmpATo').value = toDateInput(new Date());
      document.getElementById('cmpBFrom').value = toDateInput(wb.start);
      document.getElementById('cmpBTo').value = toDateInput(wb.end);
    }
  }
  renderCompareView();
}

function toDateInput(d) { return d.toISOString().slice(0, 10); }

function getWeekRange(offsetWeeks) {
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = (day === 0 ? -6 : 1 - day);
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diffToMonday + offsetWeeks * 7);
  monday.setHours(0, 0, 0, 0);
  const end = offsetWeeks === 0 ? new Date() : new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6, 23, 59, 59, 999);
  return { start: monday, end };
}
function getMonthRange(offsetMonths) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() + offsetMonths, 1);
  const end = offsetMonths === 0 ? new Date() : new Date(now.getFullYear(), now.getMonth() + offsetMonths + 1, 0, 23, 59, 59, 999);
  return { start, end };
}
function getPeriodRanges() {
  if (cmpPreset === 'week') return { a: getWeekRange(0), b: getWeekRange(-1), labelA: 'Minggu Ini', labelB: 'Minggu Lalu' };
  if (cmpPreset === 'month') return { a: getMonthRange(0), b: getMonthRange(-1), labelA: 'Bulan Ini', labelB: 'Bulan Lalu' };
  const af = document.getElementById('cmpAFrom')?.value, at = document.getElementById('cmpATo')?.value;
  const bf = document.getElementById('cmpBFrom')?.value, bt = document.getElementById('cmpBTo')?.value;
  const a = { start: af ? new Date(af + 'T00:00:00') : null, end: at ? new Date(at + 'T23:59:59') : null };
  const b = { start: bf ? new Date(bf + 'T00:00:00') : null, end: bt ? new Date(bt + 'T23:59:59') : null };
  return { a, b, labelA: (af && at) ? `${af}${af!==at?' – '+at:''}` : 'Periode A', labelB: (bf && bt) ? `${bf}${bf!==bt?' – '+bt:''}` : 'Periode B' };
}
function snapshotsInRange(start, end) {
  if (!start || !end) return [];
  return historyData.filter(h => { const d = new Date(h.date); return d >= start && d <= end; }).filter(h => h.rows_snapshot && h.rows_snapshot.length);
}
function periodOverallAvg(snaps, storeFilter) {
  let sum = 0, cnt = 0;
  snaps.forEach(s => (s.rows_snapshot || []).forEach(r => { if (storeFilter && r.store !== storeFilter) return; sum += Number(r.total || 0); cnt++; }));
  return cnt ? sum / cnt : null;
}
function aggByStore(snaps, storeFilter) {
  const sum = {}, cnt = {};
  snaps.forEach(s => (s.rows_snapshot || []).forEach(r => {
    if (storeFilter && r.store !== storeFilter) return;
    const st = r.store || '(Tanpa Store)';
    sum[st] = (sum[st] || 0) + Number(r.total || 0); cnt[st] = (cnt[st] || 0) + 1;
  }));
  const out = {}; Object.keys(sum).forEach(s => out[s] = sum[s] / cnt[s]);
  return out;
}
function aggByEro(snaps, storeFilter) {
  const sum = {}, cnt = {}, storeOf = {}, lastRank = {}, lastDate = {};
  snaps.forEach(s => (s.rows_snapshot || []).forEach(r => {
    if (storeFilter && r.store !== storeFilter) return;
    sum[r.name] = (sum[r.name] || 0) + Number(r.total || 0); cnt[r.name] = (cnt[r.name] || 0) + 1;
    storeOf[r.name] = r.store;
    const d = new Date(s.date);
    if (!lastDate[r.name] || d > lastDate[r.name]) { lastDate[r.name] = d; lastRank[r.name] = r.rank; }
  }));
  const out = {}; Object.keys(sum).forEach(n => out[n] = { avg: sum[n] / cnt[n], store: storeOf[n], rank: lastRank[n] });
  return out;
}

function populateCmpStoreFilter() {
  const sel = document.getElementById('cmpStoreFilter');
  if (!sel) return;
  const prev = sel.value;
  const stores = [...new Set((lastWithTotals || []).map(r => r.store).filter(Boolean))].sort();
  sel.innerHTML = '<option value="">Semua Store</option>' + stores.map(s => `<option value="${escapeAttr(s)}">${escapeHtml(s)}</option>`).join('');
  if (prev && [...sel.options].some(o => o.value === prev)) sel.value = prev;
}

function renderCompareView() {
  populateCmpStoreFilter();
  const storeFilter = document.getElementById('cmpStoreFilter')?.value || '';
  const kpiEl = document.getElementById('cmpKpiRow');
  const contentEl = document.getElementById('cmpContent');
  if (!kpiEl || !contentEl) return;
  if (cmpViewType === 'period') { renderPeriodCompare(storeFilter, kpiEl, contentEl); return; }
  renderTrendCompare(storeFilter, kpiEl, contentEl);
}

function renderTrendCompare(storeFilter, kpiEl, contentEl) {
  const snaps = getCmpSnapshots();
  // Summary KPIs
  if (snaps.length >= 2) {
    const first = snaps[0], last = snaps[snaps.length - 1];
    const dAvg = last.avg - first.avg;
    const firstRows = storeFilter ? (first.rows_snapshot || []).filter(r => r.store === storeFilter) : (first.rows_snapshot || []);
    const lastRows = storeFilter ? (last.rows_snapshot || []).filter(r => r.store === storeFilter) : (last.rows_snapshot || []);
    const firstAvg = firstRows.length ? firstRows.reduce((s,r)=>s+Number(r.total||0),0)/firstRows.length : first.avg;
    const lastAvg = lastRows.length ? lastRows.reduce((s,r)=>s+Number(r.total||0),0)/lastRows.length : last.avg;
    const d2 = lastAvg - firstAvg;
    const improved = lastRows.filter(r => { const prev = firstRows.find(p=>p.name===r.name); return prev && Number(r.total||0) > Number(prev.total||0); }).length;
    const declined = lastRows.filter(r => { const prev = firstRows.find(p=>p.name===r.name); return prev && Number(r.total||0) < Number(prev.total||0); }).length;
    const dClass = d2 > 0 ? 'up' : d2 < 0 ? 'down' : 'neu';
    const dSign = d2 >= 0 ? '+' : '';
    kpiEl.innerHTML = `
      <div class="cmp-kpi"><div class="ck">Snapshot Dibandingkan</div><div class="cv">${snaps.length}</div><div class="cd neu">${first.label} → ${last.label}</div></div>
      <div class="cmp-kpi"><div class="ck">Avg Awal Periode</div><div class="cv">${firstAvg.toFixed(2)}</div><div class="cd neu">${first.label}</div></div>
      <div class="cmp-kpi"><div class="ck">Avg Akhir Periode</div><div class="cv">${lastAvg.toFixed(2)}</div><div class="cd ${dClass}">${dSign}${d2.toFixed(2)} dari awal</div></div>
      <div class="cmp-kpi"><div class="ck">Naik / Turun</div><div class="cv">${improved} / ${declined}</div><div class="cd neu">ERO${storeFilter ? ' di '+storeFilter : ''}</div></div>`;
  } else {
    kpiEl.innerHTML = `<div class="cmp-kpi" style="grid-column:1/-1"><div class="cmp-empty"><i class="ti ti-database-off"></i>Butuh minimal 2 snapshot untuk analisis. Simpan snapshot dari menu Kelola Data.</div></div>`;
    contentEl.innerHTML = '';
    return;
  }

  if (cmpMode === 'store-time') renderCmpStoreTime(snaps, storeFilter, contentEl);
  else if (cmpMode === 'ero-time') renderCmpEroTime(snaps, storeFilter, contentEl);
  else if (cmpMode === 'ero-store') renderCmpEroStore(storeFilter, contentEl);
}

// ---- BANDINGKAN 2 PERIODE (minggu/bulan/custom, sampai granularitas harian) ----
function renderPeriodCompare(storeFilter, kpiEl, contentEl) {
  const { a, b, labelA, labelB } = getPeriodRanges();
  const snapsA = snapshotsInRange(a.start, a.end);
  const snapsB = snapshotsInRange(b.start, b.end);
  if (!a.start || !a.end || !b.start || !b.end || !snapsA.length || !snapsB.length) {
    kpiEl.innerHTML = `<div class="cmp-kpi" style="grid-column:1/-1"><div class="cmp-empty"><i class="ti ti-calendar-off"></i>Tidak ada snapshot yang cukup pada salah satu periode.<br>${escapeHtml(labelB)}: ${snapsB.length} snapshot &middot; ${escapeHtml(labelA)}: ${snapsA.length} snapshot.<br>Pastikan sudah ada snapshot tersimpan di rentang tanggal tersebut.</div></div>`;
    contentEl.innerHTML = '';
    return;
  }
  const avgA = periodOverallAvg(snapsA, storeFilter);
  const avgB = periodOverallAvg(snapsB, storeFilter);
  const d = (avgA !== null && avgB !== null) ? avgA - avgB : null;
  const dc = d === null ? 'neu' : d > 0 ? 'up' : d < 0 ? 'down' : 'neu';
  kpiEl.innerHTML = `
    <div class="cmp-kpi"><div class="ck">${escapeHtml(labelB)}</div><div class="cv">${avgB !== null ? avgB.toFixed(2) : '–'}</div><div class="cd neu">${snapsB.length} snapshot</div></div>
    <div class="cmp-kpi"><div class="ck">${escapeHtml(labelA)}</div><div class="cv">${avgA !== null ? avgA.toFixed(2) : '–'}</div><div class="cd neu">${snapsA.length} snapshot</div></div>
    <div class="cmp-kpi"><div class="ck">Perubahan</div><div class="cv">${d !== null ? (d>=0?'+':'')+d.toFixed(2) : '–'}</div><div class="cd ${dc}">${dc==='up'?'Membaik':dc==='down'?'Menurun':'Stabil'}</div></div>
    <div class="cmp-kpi"><div class="ck">Cakupan</div><div class="cv" style="font-size:15px;">${storeFilter ? escapeHtml(storeFilter) : 'Semua Store'}</div><div class="cd neu">${cmpMode==='store-time'?'Fokus antar Store':'Fokus antar ERO'}</div></div>`;

  if (cmpMode === 'store-time') renderPeriodCompareStore(snapsA, snapsB, labelA, labelB, storeFilter, contentEl);
  else renderPeriodCompareEro(snapsA, snapsB, labelA, labelB, storeFilter, contentEl);
}

function renderPeriodCompareStore(snapsA, snapsB, labelA, labelB, storeFilter, el) {
  const aggA = aggByStore(snapsA, storeFilter), aggB = aggByStore(snapsB, storeFilter);
  const stores = [...new Set([...Object.keys(aggA), ...Object.keys(aggB)])].sort((s1, s2) => (aggA[s2] || 0) - (aggA[s1] || 0));
  if (!stores.length) { el.innerHTML = '<div class="cmp-empty"><i class="ti ti-building-store"></i>Tidak ada data store pada kedua periode.</div>'; return; }
  const maxVal = Math.max(...stores.map(s => Math.max(aggA[s] || 0, aggB[s] || 0)), 0.01);
  const pairsHtml = stores.map(s => {
    const vA = aggA[s], vB = aggB[s];
    const d = (vA !== undefined && vB !== undefined) ? vA - vB : null;
    const dc = d === null ? 'neu' : d > 0 ? 'up' : d < 0 ? 'down' : 'neu';
    return `<div class="cmp-pair-row">
      <div class="cmp-pair-name"><span>${escapeHtml(s)}</span><span class="cmp-delta ${dc}">${d !== null ? (dc==='up'?'▲ ':dc==='down'?'▼ ':'')+(d>=0?'+':'')+d.toFixed(2) : '–'}</span></div>
      <div class="cmp-pair-bars">
        <div class="cmp-pair-bar-line"><span class="cmp-pair-bar-tag">${escapeHtml(labelB)}</span><div class="cmp-pair-bar-track"><div class="cmp-pair-bar-fill" style="width:${vB!==undefined?(vB/maxVal*100):0}%;background:#94A3B8"></div></div><span class="cmp-pair-bar-val">${vB!==undefined?vB.toFixed(2):'–'}</span></div>
        <div class="cmp-pair-bar-line"><span class="cmp-pair-bar-tag">${escapeHtml(labelA)}</span><div class="cmp-pair-bar-track"><div class="cmp-pair-bar-fill" style="width:${vA!==undefined?(vA/maxVal*100):0}%;background:var(--brand)"></div></div><span class="cmp-pair-bar-val">${vA!==undefined?vA.toFixed(2):'–'}</span></div>
      </div>
    </div>`;
  }).join('');
  const tableRows = stores.map(s => {
    const vA = aggA[s], vB = aggB[s];
    const d = (vA !== undefined && vB !== undefined) ? vA - vB : null;
    const dc = d === null ? 'neu' : d > 0 ? 'up' : d < 0 ? 'down' : 'neu';
    return `<tr><td><div class="cmp-name-cell">${escapeHtml(s)}</div></td><td>${vB!==undefined?vB.toFixed(2):'–'}</td><td><b style="color:var(--brand)">${vA!==undefined?vA.toFixed(2):'–'}</b></td><td><span class="cmp-delta ${dc}">${d!==null?(dc==='up'?'▲':dc==='down'?'▼':'')+(d>=0?'+':'')+d.toFixed(2):'–'}</span></td></tr>`;
  }).join('');
  el.innerHTML = `
    <div class="cmp-section-title"><i class="ti ti-chart-bar"></i>${escapeHtml(labelB)} vs ${escapeHtml(labelA)} per Store</div>
    <div class="cmp-chart-wrap">${pairsHtml}</div>
    <div class="cmp-section-title"><i class="ti ti-table"></i>Tabel Perbandingan</div>
    <div class="cmp-table-wrap"><table class="cmp-table">
      <thead><tr><th>Store</th><th>${escapeHtml(labelB)}</th><th>${escapeHtml(labelA)}</th><th>Delta</th></tr></thead>
      <tbody>${tableRows}</tbody>
    </table></div>`;
}

function renderPeriodCompareEro(snapsA, snapsB, labelA, labelB, storeFilter, el) {
  const aggA = aggByEro(snapsA, storeFilter), aggB = aggByEro(snapsB, storeFilter);
  const names = [...new Set([...Object.keys(aggA), ...Object.keys(aggB)])].sort((n1, n2) => (aggA[n2]?.avg || 0) - (aggA[n1]?.avg || 0));
  if (!names.length) { el.innerHTML = '<div class="cmp-empty"><i class="ti ti-user-off"></i>Tidak ada data ERO pada kedua periode.</div>'; return; }
  const rows = names.map(n => {
    const vA = aggA[n], vB = aggB[n];
    const d = (vA && vB) ? vA.avg - vB.avg : null;
    const dc = d === null ? 'neu' : d > 0 ? 'up' : d < 0 ? 'down' : 'neu';
    const rankD = (vA && vB && vA.rank != null && vB.rank != null) ? vB.rank - vA.rank : null;
    const rankHtml = rankD === null ? '–' : rankD > 0 ? `<span class="cmp-delta up">▲ ${rankD}</span>` : rankD < 0 ? `<span class="cmp-delta down">▼ ${Math.abs(rankD)}</span>` : '<span class="cmp-delta neu">–</span>';
    const grade = vA ? calcGrade(vA.avg) : (vB ? calcGrade(vB.avg) : null);
    return `<tr>
      <td><div class="cmp-name-cell">${escapeHtml(n)}</div><div class="cmp-store-tag">${escapeHtml((vA&&vA.store)||(vB&&vB.store)||'')}</div></td>
      <td>${vB?vB.avg.toFixed(2):'–'}</td>
      <td><b style="color:var(--brand)">${vA?vA.avg.toFixed(2):'–'}</b></td>
      <td><span class="cmp-delta ${dc}">${d!==null?(dc==='up'?'▲':dc==='down'?'▼':'')+(d>=0?'+':'')+d.toFixed(2):'–'}</span></td>
      <td>${rankHtml}</td>
      <td>${grade?`<span class="grade ${gradeClass(grade)}">${grade}</span>`:'–'}</td>
    </tr>`;
  }).join('');
  el.innerHTML = `
    <div class="cmp-section-title"><i class="ti ti-table"></i>${escapeHtml(labelB)} vs ${escapeHtml(labelA)} per ERO${storeFilter?' — '+escapeHtml(storeFilter):''}</div>
    <div class="cmp-table-wrap"><table class="cmp-table">
      <thead><tr><th>Nama ERO</th><th>${escapeHtml(labelB)}</th><th>${escapeHtml(labelA)}</th><th>Delta Poin</th><th>Perub. Rank</th><th>Grade Terkini</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>`;
}

function getCmpSnapshots() {
  let snaps = [...historyData].sort((a, b) => new Date(a.date) - new Date(b.date));
  if (cmpPeriod > 0) {
    const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - cmpPeriod);
    snaps = snaps.filter(s => new Date(s.date) >= cutoff);
  }
  return snaps.filter(s => s.rows_snapshot && s.rows_snapshot.length);
}

// ---- MODE 1: Store dari waktu ke waktu ----
function renderCmpStoreTime(snaps, storeFilter, el) {
  // Kumpulkan semua store yang muncul
  const allStores = [...new Set(snaps.flatMap(s => (s.rows_snapshot||[]).map(r=>r.store).filter(Boolean)))].sort();
  const stores = storeFilter ? [storeFilter] : allStores.slice(0, 6);
  const COLORS = ['#F5B400','#3B82F6','#10B981','#EF4444','#8B5CF6','#F97316'];
  const labels = snaps.map(s => s.label);

  // Series per store
  const series = stores.map((store, i) => ({
    name: store,
    color: COLORS[i % COLORS.length],
    values: snaps.map(s => {
      const rows = (s.rows_snapshot||[]).filter(r => r.store === store);
      return rows.length ? rows.reduce((a,r)=>a+Number(r.total||0),0)/rows.length : null;
    })
  }));

  const chartHtml = buildCmpLineChart(labels, series, 280);
  const legendHtml = `<div class="cmp-chart-legend">${series.map(s=>`<span><i style="background:${s.color}"></i>${escapeHtml(s.name)}</span>`).join('')}</div>`;

  // Table: last 2 snaps comparison per store
  const cur = snaps[snaps.length-1], prev = snaps[snaps.length-2];
  const tableRows = allStores.map(store => {
    const cRows = (cur.rows_snapshot||[]).filter(r=>r.store===store);
    const pRows = (prev.rows_snapshot||[]).filter(r=>r.store===store);
    if (!cRows.length) return null;
    const cAvg = cRows.reduce((a,r)=>a+Number(r.total||0),0)/cRows.length;
    const pAvg = pRows.length ? pRows.reduce((a,r)=>a+Number(r.total||0),0)/pRows.length : null;
    const d = pAvg !== null ? cAvg - pAvg : null;
    const dc = d === null ? 'neu' : d > 0 ? 'up' : d < 0 ? 'down' : 'neu';
    const ds = d === null ? '–' : (d>=0?'+':'')+d.toFixed(2);
    const bestGrade = cRows.reduce((b,r)=>{ const g=calcGrade(Number(r.total||0)); const order=['Perfect','Good','Need Improve','Bad','Poor']; return order.indexOf(g)<order.indexOf(b)?g:b; }, 'Poor');
    return `<tr>
      <td><div class="cmp-name-cell">${escapeHtml(store)}</div></td>
      <td><b>${cRows.length}</b></td>
      <td><b>${pAvg!==null?pAvg.toFixed(2):'–'}</b></td>
      <td><b style="color:var(--brand)">${cAvg.toFixed(2)}</b></td>
      <td><span class="cmp-delta ${dc}">${dc==='up'?'▲':dc==='down'?'▼':''}${ds}</span></td>
      <td><span class="grade ${gradeClass(bestGrade)}">${bestGrade}</span></td>
    </tr>`;
  }).filter(Boolean).join('');

  el.innerHTML = `
    <div class="cmp-section-title"><i class="ti ti-chart-line"></i>Tren Rata-rata Poin per Store</div>
    <div class="cmp-chart-wrap">${chartHtml}${legendHtml}</div>
    <div class="cmp-section-title"><i class="ti ti-table"></i>Perbandingan ${escapeHtml(prev.label)} vs ${escapeHtml(cur.label)}</div>
    <div class="cmp-table-wrap"><table class="cmp-table">
      <thead><tr><th>Store</th><th>Jumlah ERO</th><th>Avg Sebelumnya</th><th>Avg Terkini</th><th>Delta</th><th>Grade Dominan</th></tr></thead>
      <tbody>${tableRows || '<tr><td colspan="6" class="cmp-empty">Tidak ada data store.</td></tr>'}</tbody>
    </table></div>`;
}

// ---- MODE 2: ERO dari waktu ke waktu ----
function renderCmpEroTime(snaps, storeFilter, el) {
  const cur = snaps[snaps.length-1];
  const COLORS = ['#F5B400','#3B82F6','#10B981','#EF4444','#8B5CF6','#F97316','#EC4899','#14B8A6'];
  let eroList = [...new Set(snaps.flatMap(s=>(s.rows_snapshot||[]).map(r=>r.name)))];
  if (storeFilter) {
    eroList = eroList.filter(name => snaps.some(s => (s.rows_snapshot||[]).some(r=>r.name===name && r.store===storeFilter)));
  }
  eroList = eroList.sort((a,b) => {
    const aLast = (cur.rows_snapshot||[]).find(r=>r.name===a);
    const bLast = (cur.rows_snapshot||[]).find(r=>r.name===b);
    return (Number(bLast?.total||0)) - (Number(aLast?.total||0));
  }).slice(0, 8);

  const labels = snaps.map(s => s.label);
  const series = eroList.map((name, i) => ({
    name,
    color: COLORS[i % COLORS.length],
    values: snaps.map(s => { const r = (s.rows_snapshot||[]).find(rr=>rr.name===name); return r ? Number(r.total||0) : null; })
  }));

  const chartHtml = buildCmpLineChart(labels, series, 300);
  const legendHtml = `<div class="cmp-chart-legend">${series.map(s=>`<span><i style="background:${s.color}"></i>${escapeHtml(s.name)}</span>`).join('')}</div>`;

  // Table: tiap ERO, nilai awal, akhir, delta, trend rank
  const prev = snaps[snaps.length-2];
  const tableRows = eroList.map(name => {
    const firstSnap = snaps.find(s=>(s.rows_snapshot||[]).some(r=>r.name===name));
    const firstR = firstSnap ? (firstSnap.rows_snapshot||[]).find(r=>r.name===name) : null;
    const curR = (cur.rows_snapshot||[]).find(r=>r.name===name);
    const prevR = (prev.rows_snapshot||[]).find(r=>r.name===name);
    const d = (curR && firstR) ? Number(curR.total||0) - Number(firstR.total||0) : null;
    const dc = d === null ? 'neu' : d > 0 ? 'up' : d < 0 ? 'down' : 'neu';
    const ds = d === null ? '–' : (d>=0?'+':'')+d.toFixed(2);
    const rankDelta = (curR && prevR) ? prevR.rank - curR.rank : null;
    const rankHtml = rankDelta === null ? '–' : rankDelta > 0 ? `<span class="cmp-delta up">▲ ${rankDelta}</span>` : rankDelta < 0 ? `<span class="cmp-delta down">▼ ${Math.abs(rankDelta)}</span>` : '<span class="cmp-delta neu">–</span>';
    const grade = curR ? calcGrade(Number(curR.total||0)) : '–';
    return `<tr>
      <td><div class="cmp-name-cell">${escapeHtml(name)}</div><div class="cmp-store-tag">${escapeHtml(curR?.store||firstR?.store||'')}</div></td>
      <td>${curR ? `<span class="cmp-rank-badge">#${curR.rank}</span>` : '–'}</td>
      <td>${firstR ? Number(firstR.total||0).toFixed(2) : '–'}</td>
      <td><b style="color:var(--brand)">${curR ? Number(curR.total||0).toFixed(2) : '–'}</b></td>
      <td><span class="cmp-delta ${dc}">${dc==='up'?'▲':dc==='down'?'▼':''}${ds}</span></td>
      <td>${rankHtml}</td>
      <td>${curR ? `<span class="grade ${gradeClass(grade)}">${grade}</span>` : '–'}</td>
    </tr>`;
  }).join('');

  el.innerHTML = `
    <div class="cmp-section-title"><i class="ti ti-chart-line"></i>Tren Poin per ERO (Top 8${storeFilter?' – '+storeFilter:''})</div>
    <div class="cmp-chart-wrap">${chartHtml}${legendHtml}</div>
    <div class="cmp-section-title"><i class="ti ti-table"></i>Ringkasan Progres ERO</div>
    <div class="cmp-table-wrap"><table class="cmp-table">
      <thead><tr><th>Nama ERO</th><th>Rank Kini</th><th>Poin Awal Periode</th><th>Poin Terkini</th><th>Delta Poin</th><th>Perub. Rank</th><th>Grade</th></tr></thead>
      <tbody>${tableRows||'<tr><td colspan="7" class="cmp-empty">Tidak ada data.</td></tr>'}</tbody>
    </table></div>`;
}

// ---- MODE 3: Perbandingan ERO dalam satu Store ----
function renderCmpEroStore(storeFilter, el) {
  const cur = snaps => snaps[snaps.length-1];
  const allSnaps = getCmpSnapshots();
  if (!allSnaps.length) { el.innerHTML = '<div class="cmp-empty"><i class="ti ti-database-off"></i>Belum ada snapshot.</div>'; return; }

  const storeMap = {};
  (lastWithTotals || []).filter(r => r.store).forEach(r => {
    const s = r.store;
    if (!storeMap[s]) storeMap[s] = [];
    storeMap[s].push(r);
  });

  const storesToShow = storeFilter ? [storeFilter] : Object.keys(storeMap).sort();
  if (!storesToShow.length) { el.innerHTML = '<div class="cmp-empty"><i class="ti ti-building-store"></i>Tidak ada data store.</div>'; return; }

  // For each store, show ERO side-by-side with bar chart
  const storeHtml = storesToShow.map(store => {
    const eros = (storeMap[store] || []).filter(r => isActive(r)).sort((a,b) => b.total - a.total);
    if (!eros.length) return '';
    const maxPt = Math.max(...eros.map(r=>r.total), 0.01);
    const avgPt = eros.reduce((s,r)=>s+r.total,0)/eros.length;

    // Trend for this store from snapshots
    const trendVals = allSnaps.map(s => {
      const rows = (s.rows_snapshot||[]).filter(r=>r.store===store);
      return rows.length ? rows.reduce((a,r)=>a+Number(r.total||0),0)/rows.length : null;
    }).filter(v=>v!==null);
    const trendDir = trendVals.length >= 2 ? (trendVals[trendVals.length-1] >= trendVals[0] ? '▲' : '▼') : '';
    const trendColor = trendVals.length >= 2 ? (trendVals[trendVals.length-1] >= trendVals[0] ? '#059669' : '#DC2626') : 'var(--text-muted)';

    const COLORS = ['#F5B400','#3B82F6','#10B981','#EF4444','#8B5CF6','#F97316','#EC4899','#14B8A6'];
    const barsHtml = eros.map((r, i) => {
      const pct = (r.total / maxPt) * 100;
      const grade = calcGrade(r.total);
      return `<div class="sp-bar-wrap">
        <span class="sp-bar-label" title="${escapeHtml(r.name)}" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(r.name.split(' ')[0])}</span>
        <div class="sp-bar"><span style="width:${pct}%;background:${COLORS[i%COLORS.length]}"></span></div>
        <span class="sp-val">${r.total.toFixed(1)}</span>
        <span class="grade ${gradeClass(grade)}" style="font-size:10px;padding:2px 6px;">${grade.replace('Need Improve','NI')}</span>
      </div>`;
    }).join('');

    const miniTrend = trendVals.length>=2 ? buildCmpSparkline(trendVals, 80, 28) : '';

    return `<div class="store-pair-card">
      <div class="sp-name">${escapeHtml(store)}<span style="color:${trendColor};font-size:13px;">${trendDir} ${trendVals.length>=2?trendVals[trendVals.length-1].toFixed(2):''}</span></div>
      <div class="sp-sub">${eros.length} ERO aktif · Avg <b>${avgPt.toFixed(2)}</b> · ${miniTrend ? 'Tren: '+miniTrend : ''}</div>
      ${barsHtml}
    </div>`;
  }).join('');

  // Summary comparison table across stores (current period)
  const storeTableRows = storesToShow.map(store => {
    const eros = (storeMap[store] || []).filter(r => isActive(r));
    if (!eros.length) return '';
    const avg = eros.reduce((s,r)=>s+r.total,0)/eros.length;
    const best = [...eros].sort((a,b)=>b.total-a.total)[0];
    const worst = [...eros].sort((a,b)=>a.total-b.total)[0];
    const grade = calcGrade(avg);
    const trendVals = allSnaps.map(s => {
      const rows = (s.rows_snapshot||[]).filter(r=>r.store===store);
      return rows.length ? rows.reduce((a,r)=>a+Number(r.total||0),0)/rows.length : null;
    }).filter(v=>v!==null);
    const d = trendVals.length >= 2 ? trendVals[trendVals.length-1] - trendVals[0] : null;
    const dc = d===null?'neu':d>0?'up':d<0?'down':'neu';
    return `<tr>
      <td><div class="cmp-name-cell">${escapeHtml(store)}</div></td>
      <td>${eros.length}</td>
      <td><b style="color:var(--brand)">${avg.toFixed(2)}</b></td>
      <td><span class="grade ${gradeClass(grade)}">${grade}</span></td>
      <td>${escapeHtml(best?.name||'–')} <span style="font-family:monospace;font-size:11px">(${best?.total?.toFixed(1)||''})</span></td>
      <td>${escapeHtml(worst?.name||'–')} <span style="font-family:monospace;font-size:11px">(${worst?.total?.toFixed(1)||''})</span></td>
      <td>${d!==null?`<span class="cmp-delta ${dc}">${dc==='up'?'▲':dc==='down'?'▼':''}${(d>=0?'+':'')+d.toFixed(2)}</span>`:'–'}</td>
    </tr>`;
  }).filter(Boolean).join('');

  el.innerHTML = `
    <div class="cmp-section-title"><i class="ti ti-users"></i>ERO per Store — Saat Ini</div>
    <div class="store-pair-grid">${storeHtml || '<div class="cmp-empty"><i class="ti ti-database-off"></i>Tidak ada data store aktif.</div>'}</div>
    <div class="cmp-section-title"><i class="ti ti-table"></i>Perbandingan Antar Store</div>
    <div class="cmp-table-wrap"><table class="cmp-table">
      <thead><tr><th>Store</th><th>ERO Aktif</th><th>Rata-rata</th><th>Grade</th><th>Terbaik</th><th>Terendah</th><th>Tren Periode</th></tr></thead>
      <tbody>${storeTableRows||'<tr><td colspan="7" class="cmp-empty">Tidak ada data.</td></tr>'}</tbody>
    </table></div>`;
}

// ---- Helpers chart ----
function buildCmpLineChart(labels, series, height) {
  if (!labels.length || !series.length) return '<div class="cmp-empty"><i class="ti ti-chart-line"></i>Tidak cukup data.</div>';
  const W = 820, H = height || 260, padL = 48, padR = 20, padT = 20, padB = 40;
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const allVals = series.flatMap(s => s.values.filter(v=>v!==null));
  const minV = Math.min(...allVals), maxV = Math.max(...allVals);
  const rangeV = (maxV - minV) || 1;
  const n = labels.length;
  const xStep = n > 1 ? innerW / (n-1) : 0;

  const toX = i => padL + i * xStep;
  const toY = v => padT + innerH - ((v - minV) / rangeV) * innerH;

  // Grid lines
  const gridCount = 4;
  const gridLines = Array.from({length:gridCount+1}, (_,i) => {
    const v = minV + (rangeV/gridCount)*i;
    const y = toY(v);
    return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W-padR}" y2="${y.toFixed(1)}" stroke="rgba(226,232,240,.5)" stroke-width="1" stroke-dasharray="4 4"/>
      <text x="${(padL-6).toFixed(1)}" y="${y.toFixed(1)}" text-anchor="end" dominant-baseline="central" font-size="10" fill="rgba(100,116,139,.8)">${v.toFixed(1)}</text>`;
  }).join('');

  // X axis labels (max 8 visible)
  const step = Math.ceil(n / 8);
  const xLabels = labels.map((l, i) => {
    if (i % step !== 0 && i !== n-1) return '';
    const x = toX(i);
    const short = l.length > 8 ? l.slice(0,8)+'…' : l;
    return `<text x="${x.toFixed(1)}" y="${(H-8).toFixed(1)}" text-anchor="middle" font-size="10" fill="rgba(100,116,139,.8)">${escapeHtml(short)}</text>`;
  }).join('');

  // Series paths
  const seriesSvg = series.map(s => {
    const pts = s.values.map((v,i) => v !== null ? `${toX(i).toFixed(1)},${toY(v).toFixed(1)}` : null);
    // Build segments (skip nulls)
    let pathD = '';
    let inPath = false;
    pts.forEach((p,i) => {
      if (p === null) { inPath = false; return; }
      if (!inPath) { pathD += `M${p} `; inPath = true; }
      else pathD += `L${p} `;
    });
    const dots = pts.map((p,i) => p ? `<circle cx="${toX(i).toFixed(1)}" cy="${toY(s.values[i]).toFixed(1)}" r="3.5" fill="${s.color}" stroke="#fff" stroke-width="1.5"/>` : '').join('');
    return `<path d="${pathD.trim()}" fill="none" stroke="${s.color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
      ${dots}`;
  }).join('');

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="min-width:${Math.min(W,600)}px">
    ${gridLines}
    ${xLabels}
    ${seriesSvg}
  </svg>`;
}

function buildCmpSparkline(values, w, h) {
  if (values.length < 2) return '';
  const W = w||80, H = h||28;
  const min = Math.min(...values), max = Math.max(...values);
  const range = (max-min)||1;
  const step = (W-4) / (values.length-1);
  const pts = values.map((v,i) => `${(2+i*step).toFixed(1)},${(H-2-((v-min)/range)*(H-4)).toFixed(1)}`).join(' ');
  const color = values[values.length-1] >= values[0] ? '#059669' : '#DC2626';
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:inline-block;vertical-align:middle"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

let appBooted = false;
const AUTO_LOGOUT_MINUTES = 60; // ubah angka ini kalau ingin durasi berbeda
let autoLogoutTimer = null;
function resetAutoLogoutTimer(){
  if(!SUPABASE_READY) return;
  if(autoLogoutTimer) clearTimeout(autoLogoutTimer);
  autoLogoutTimer = setTimeout(async ()=>{
    try{ await sb.auth.signOut(); }catch(e){}
    alert('Sesi Anda otomatis keluar karena tidak ada aktivitas selama '+AUTO_LOGOUT_MINUTES+' menit. Silakan login kembali.');
    location.reload();
  }, AUTO_LOGOUT_MINUTES*60*1000);
}
function initAutoLogoutWatcher(){
  ['mousemove','mousedown','keydown','touchstart','scroll'].forEach(evt=>{
    document.addEventListener(evt, resetAutoLogoutTimer, {passive:true});
  });
  resetAutoLogoutTimer();
}
async function bootApp(){
  if(appBooted) return; appBooted = true;
  await loadAdminState();
  if(SUPABASE_READY){sb.auth.onAuthStateChange((_event,session)=>{currentUser=session?.user||null;isAdmin=isAdminFromUser(currentUser);updateAdminUI();render();});}
  await loadData();await loadHistory();
  if(SUPABASE_READY)setInterval(async()=>{if(!document.hidden&&!isAdmin)await loadData();},30000);
  initAutoLogoutWatcher();
}
document.addEventListener('DOMContentLoaded',()=>{ const d=new Date(); d.setMonth(d.getMonth()-1); const m=document.getElementById('archiveMonth'); if(m)m.value=d.toISOString().slice(0,7); updateUploadModeUI(); });
(async function initGate(){
  if(!SUPABASE_READY){ unlockView(); bootApp(); return; }
  const {data:{session}} = await sb.auth.getSession();
  if(session){ currentUser = session.user; isAdmin = isAdminFromUser(currentUser); unlockView(); bootApp(); }
})();

// =========================================
// PWA: registrasi service worker (mode offline & installable)
// =========================================
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('sw.js').catch(err=>console.warn('Registrasi service worker gagal:', err));
  });
}
