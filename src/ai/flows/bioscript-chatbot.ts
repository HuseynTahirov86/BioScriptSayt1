// src/ai/flows/bioscript-chatbot.ts
'use server';

/**
 * @fileOverview A chatbot flow that provides information about BioScript.
 *
 * - bioscriptChatbot - A function that handles the chatbot interaction.
 * - BioScriptChatbotInput - The input type for the bioscriptChatbot function.
 * - BioScriptChatbotOutput - The return type for the bioscriptChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BioScriptChatbotInputSchema = z.object({
  query: z.string().describe('The user query about BioScript.'),
});
export type BioScriptChatbotInput = z.infer<typeof BioScriptChatbotInputSchema>;

const BioScriptChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type BioScriptChatbotOutput = z.infer<typeof BioScriptChatbotOutputSchema>;

const bioscriptContext = `
---
Layihə haqqında ümumi məlumat:
"BioScript" — səhiyyə sahəsində istifadəyə yönəlmiş biometrik resept və elektron identifikasiya sistemidir. Layihə həkimlərin elektron reseptləri təhlükəsiz şəkildə yazmasını, pasiyentlərin isə apteklərdən yalnız özlərinə aid reseptlər üzrə dərmanları əldə etməsini təmin edir. Sistem, barmaq izi texnologiyası ilə resept saxtakarlığının və dərman sui-istifadəsinin qarşısını alır, kağız sənədləşməni aradan qaldırır və bütün prosesi rəqəmsallaşdıraraq səhiyyə xidmətlərini daha müasir və səmərəli edir.

İş prinsipi:
1. Həkimin sistemə daxil olması: Həkim istifadəçi adı və parolu ilə təhlükəsiz şəkildə sistemə daxil olur.
2. Pasiyentin identifikasiyası: Həkimin qəbulunda olan pasiyent barmaq izi skaneri vasitəsilə identifikasiya olunur.
3. Reseptin yazılması: Həkim pasiyentin təsdiqlənmiş profilinə elektron resept tərtib edir və bu, mərkəzi bazada saxlanılır.
4. Aptekdə reseptin əldə olunması: Pasiyent aptekdə barmaq izini skan etdirir və yalnız özünə aid aktiv reseptləri görür.

Layihənin üstünlükləri:
- Yüksək Biometrik Təhlükəsizlik: Reseptlər yalnız sahibinin barmaq izi ilə əldə edilə bilər.
- Sui-istifadəyə Qarşı Mübarizə: Psixotrop və nəzarət olunan dərmanların qanunsuz dövriyyəsinin qarşısını alır.
- Kağızsız Səhiyyə: Kağız reseptləri və arxivləşdirmə problemlərini aradan qaldırır.
- Hər Kəs Üçün Əlçatanlıq: Yaşlılar və texnologiyadan uzaq insanlar üçün asan istifadə.
- Sürətli Tibbi Tarixçə: Həkimlər pasiyentin bütün müalicə tarixçəsinə saniyələr içində çıxış əldə edir.
- Süni Zəka Dəstəyi: AI, həkimlərə dəqiq diaqnoz və müalicə üçün ağıllı tövsiyələr verir, dərmanların qarşılıqlı təsirini analiz edir.

Layihənin uğurları:
- InnoStart Hakatonunda 3-cü yer.
- 3D Bacarıqlar: Mexatronika yarışmasında 1-ci yer.
- Naxçıvan Dövlət Universitetinin Xəstəxanasından müsbət rəsmi rəy.

---
Qiymət Paketləri:

🏥 Xəstəxana Paketi (Populyar):
- İlkin Ödəniş: 50 USD (bir həkim üçün lisenziya)
- Aylıq Ödəniş: 20 USD / həkim
- Funksiyalar: Biometrik E-resept sistemi, Həkim paneli, Pasiyent tarixçəsi görüntüləmə, Admin panel, Analitika və hesabatlar.

🏪 Aptek Paketi (Populyar):
- İlkin Ödəniş: 50 USD
- Aylıq Ödəniş: Satılan dərmanların 3%-i
- Funksiyalar: Resept doğrulama və qeydiyyat, Çevik resept idarəsi, Satış tarixçəsi və hesabatlar, Aptek admin paneli.

🏢 Korporativ Paket:
- Təsvir: Böyük xəstəxanalar və səhiyyə şəbəkələri üçün fərdi həllər.
- Funksiyalar: Limitsiz həkim və aptek filialı, bütün paketlərin xüsusiyyətləri, fərdi inteqrasiyalar (API), genişləndirilmiş analitika, xüsusi dəstək meneceri.
- Qiymət: Fərdi təklif üçün əlaqə saxlanılmalıdır.

Qeyd: Bütün paketlərə ilkin texniki qurulum və tələb olunan biometrik avadanlıqlar (barmaq izi skanerləri) daxildir.

---
Komanda, Tərəfdaşlar və Blog:
- Komanda: Hüseyn Tahirov
İcraçı Direktor & Baş Developer
Sosial media hesabları:
https://www.linkedin.com/in/h%C3%BCseyntahirov/?originalSubdomain=az
https://www.instagram.com/huseyntahirov_/?__pwa=1
https://www.facebook.com/profile.php?id=61576345757725

Hüseyn İmanov
Həmtəsisçi & Marketinq Direktoru
Sosial media hesabları:
https://www.bioscript.shop/linkedin.com/in/huseyn-imanov?originalSubdomain=az
https://www.instagram.com/huseynimanov/?__pwa=1
https://www.facebook.com/huseynimanovv

Samir Həsənov
Layihə Meneceri
Sosial media hesabları:
https://www.instagram.com/_samir_hasanov/?__pwa=1
https://www.facebook.com/share/1KvPoJ2EPa/

Azərin Cəfərli
Hüquqşünas
Sosial media hesabları:
https://www.linkedin.com/in/azerin-jafarli-40916234a
https://www.facebook.com/share/1ARQL3DcYF/
- Tərəfdaşlar (Dəstəkçilər): BioScript layihəsinin inkişafında və yayılmasında aşağıdakı qurumların dəstəyi olmuşdur:

Naxçıvan Dövlət Universiteti
Layihənin akademik və texniki əsaslarının formalaşmasına dəstək verən əsas tərəfdaş.

TƏBİB – Tibbi Ərazi Bölmələrini İdarəetmə Birliyi
Layihənin səhiyyə sisteminə inteqrasiyası və rəsmi rəy prosesi çərçivəsində əməkdaşlıq edilmişdir.

İnnovasiya və Rəqəmsal İnkişaf Agentliyi (İRİA)
Startap və texnoloji həllərin dəstəklənməsi sahəsində təşəbbüslərilə layihəyə texnoloji baxış qatmışdır.

SUP.VC
Startaplar üçün inkubasiya və mentorluq dəstəyi verən investisiya platforması.

Naxçıvan Dövlət Universitetinin nəzdində İngilis Dili İxtisaslaşmış Gimnaziya
Layihənin ilkin konsepsiya və prototiplərinin formalaşdığı mühit.

TGT – Tələbə Gənclər Təşkilatı (NDU)
Maarifləndirmə, təqdimatlar və tələbə dəstəyi fəaliyyətlərində fəal rol alır.

Naxçıvan Dövlət Universiteti Tələbə Elmi Cəmiyyəti
Layihənin elmi əsaslara uyğun qurulması, tələbə tədqiqatlarının təşviqi və ideyanın akademik tərəfdən inkişaf etdirilməsində mühüm rol oynamışdır.
- Blog: Sektorla bağlı ən son xəbərlər, yeniliklər və məqalələr üçün "Blog" səhifəmizi ziyarət edin.

---
Əlaqə Məlumatları:
- Ünvan: Naxçıvan şəhəri, Əziz Əliyev küçəsi, 4
- E-poçt: info@bioscript.shop
- Telefon: +994 60 528 55 05
- Demo Tələbi: Saytın "Demo Tələb Et" səhifəsindən müraciət edə bilərsiniz.
`;

export async function bioscriptChatbot(input: BioScriptChatbotInput): Promise<BioScriptChatbotOutput> {
  return bioscriptChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'bioscriptChatbotPrompt',
  input: {schema: BioScriptChatbotInputSchema},
  output: {schema: BioScriptChatbotOutputSchema},
  prompt: `Sən BioScript, səhiyyə texnologiyaları şirkəti haqqında məlumat verən bir köməkçisən. Sənə verilən kontekstdəki BÜTÜN məlumatlardan istifadə edərək istifadəçinin suallarına cavab ver. Əgər məlumat kontekstdə yoxdursa, "Bu barədə məlumatım yoxdur, amma saytın müvafiq səhifəsinə baxa bilərsiniz" de. Hər zaman Azərbaycan dilində cavab ver. Cavabların qısa, dəqiq və səmimi olsun.

Kontekst:
${bioscriptContext}

Sual: {{query}}`,
});

const bioscriptChatbotFlow = ai.defineFlow(
  {
    name: 'bioscriptChatbotFlow',
    inputSchema: BioScriptChatbotInputSchema,
    outputSchema: BioScriptChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
