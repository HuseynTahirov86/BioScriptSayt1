
'use client';

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {

  useEffect(() => {
    document.title = 'Gizlilik Siyasəti | BioScript';
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1">
            <section className="bg-white py-12 md:py-24 lg:py-32">
                <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                      className="space-y-8"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div variants={itemVariants}>
                        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">📜 BioScript Gizlilik Siyasəti</h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Yenilənmə tarixi: 08.08.2025
                        </p>
                         <p className="mt-2 text-sm text-muted-foreground">
                            Əhatə dairəsi: www.bioscript.shop və bütün alt domenlər
                        </p>
                      </motion.div>
                      
                      <motion.div variants={itemVariants} className="space-y-3 text-lg text-muted-foreground">
                        <h2 className="text-2xl font-bold text-foreground">1. Giriş</h2>
                        <p>
                           Bu Gizlilik Siyasəti, BioScript platformasının istifadəçilərindən topladığı məlumatların necə toplanması, saxlanması, istifadə edilməsi və qorunmasını izah edir. Biz sizin məxfiliyinizə hörmətlə yanaşırıq və məlumatlarınızı qanuna uyğun şəkildə qorumağı öhdəmizə götürürük.
                        </p>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-3 text-lg text-muted-foreground">
                        <h2 className="text-2xl font-bold text-foreground">2. Topladığımız Məlumatlar</h2>
                        <h3 className="text-xl font-bold text-foreground">a) Birbaşa istifadəçi məlumatları</h3>
                        <p>İstifadəçilər qeydiyyatdan keçərkən və ya sistemdən istifadə edərkən aşağıdakı məlumatları təqdim edə bilərlər:</p>
                        <ul className="list-disc space-y-2 pl-6">
                            <li>Ad, soyad</li>
                            <li>E-poçt ünvanı</li>
                            <li>Telefon nömrəsi</li>
                            <li>İstifadəçi adı və şifrə</li>
                            <li>Barmaq izi (yalnız sistem daxilində autentifikasiya məqsədilə; serverdə şifrələnmiş şəkildə saxlanılır)</li>
                            <li>Peşə və işlədiyi müəssisə (həkim və ya aptek işçiləri üçün)</li>
                        </ul>
                         <h3 className="text-xl font-bold text-foreground mt-4">b) Avtomatik toplanan texniki məlumatlar</h3>
                         <ul className="list-disc space-y-2 pl-6">
                            <li>IP ünvanı</li>
                            <li>Brauzer növü və versiyası</li>
                            <li>Ziyarət edilən səhifələr və vaxt məlumatları</li>
                            <li>Cihaz növü və əməliyyat sistemi</li>
                        </ul>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-3 text-lg text-muted-foreground">
                        <h2 className="text-2xl font-bold text-foreground">3. Məlumatlardan İstifadə Məqsədləri</h2>
                        <p>Topladığımız məlumatlar aşağıdakı məqsədlərlə istifadə olunur:</p>
                        <ul className="list-disc space-y-2 pl-6">
                            <li>İstifadəçi hesablarının yaradılması və idarə olunması</li>
                            <li>BioScript cihazları və sistemləri ilə inteqrasiya təmin etmək</li>
                            <li>Elektron reseptlərin və biometrik autentifikasiyanın işləməsi</li>
                            <li>İstifadəçi təhlükəsizliyini və məlumatların qorunmasını təmin etmək</li>
                            <li>Sistemin təkmilləşdirilməsi və analitik məqsədlərlə</li>
                        </ul>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-3 text-lg text-muted-foreground">
                        <h2 className="text-2xl font-bold text-foreground">4. Məlumatların Üçüncü Tərəflərlə Paylaşılması</h2>
                        <p>
                          BioScript istifadəçi məlumatlarını üçüncü tərəflərlə satmır, paylaşmır və ya kommersiya məqsədilə ötürmür, yalnız aşağıdakı hallar istisnadır:
                        </p>
                         <ul className="list-disc space-y-2 pl-6">
                            <li>İstifadəçinin yazılı razılığı olduqda</li>
                            <li>Qanunvericiliyin tələb etdiyi hallarda (məsələn, məhkəmə qərarı)</li>
                            <li>Xidmət göstərilməsi üçün tərəfdaş texnologiya təminatçıları ilə (yalnız zəruri və şifrələnmiş formatda)</li>
                        </ul>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-3 text-lg text-muted-foreground">
                        <h2 className="text-2xl font-bold text-foreground">5. Barmaq izi və Biometrik Məlumatlar</h2>
                        <p>
                          Barmaq izi məlumatları yalnız yerli sistemdə istifadə olunur və serverdə şifrələnmiş (hash edilmiş) formatda saxlanılır. Bu məlumatlar istifadəçinin şəxsiyyətini təsdiqləmək və reseptlərin təhlükəsizliyini təmin etmək üçün istifadə olunur.
                        </p>
                      </motion.div>
                      
                       <motion.div variants={itemVariants} className="space-y-3 text-lg text-muted-foreground">
                        <h2 className="text-2xl font-bold text-foreground">6. Məlumatların Saxlanması Müddəti</h2>
                        <p>İstifadəçi məlumatları yalnız platformadan istifadə müddətində saxlanılır. Hesab bağlandıqdan sonra:</p>
                         <ul className="list-disc space-y-2 pl-6">
                            <li>Əsas istifadəçi məlumatları 30 gün ərzində silinir</li>
                            <li>Elektron reseptlər və hüquqi qeydiyyatlar qanuni öhdəliklərə uyğun olaraq müəyyən müddət ərzində arxivlənə bilər</li>
                        </ul>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-3 text-lg text-muted-foreground">
                        <h2 className="text-2xl font-bold text-foreground">7. İstifadəçi Hüquqları</h2>
                        <p>İstifadəçilər aşağıdakı hüquqlara malikdir:</p>
                        <ul className="list-disc space-y-2 pl-6">
                            <li>Məlumatlarına çıxış əldə etmək</li>
                            <li>Məlumatların düzəldilməsini və ya silinməsini tələb etmək</li>
                            <li>Hesablarının bağlanmasını və bütün şəxsi məlumatlarının silinməsini istəmək</li>
                        </ul>
                        <p>Bunun üçün info@bioscript.az elektron poçt ünvanına müraciət edə bilərsiniz.</p>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-3 text-lg text-muted-foreground">
                        <h2 className="text-2xl font-bold text-foreground">8. Məlumatların Qorunması</h2>
                        <p>BioScript məlumatların təhlükəsizliyi üçün aşağıdakı tədbirləri görür:</p>
                         <ul className="list-disc space-y-2 pl-6">
                            <li>SSL sertifikatlı şifrəli əlaqə</li>
                            <li>Server səviyyəsində firewall və anti-DDoS qorunması</li>
                            <li>İki mərhələli autentifikasiya (2FA)</li>
                            <li>Parolların bcrypt ilə şifrələnməsi</li>
                            <li>Biometrik məlumatların heç vaxt düz formatda saxlanılmaması</li>
                        </ul>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-3 text-lg text-muted-foreground">
                        <h2 className="text-2xl font-bold text-foreground">9. Çerezlər (Cookies)</h2>
                        <p>
                          Sayt istifadə təcrübəsini artırmaq üçün çerezlərdən istifadə edə bilər. İstifadəçi brauzer parametrlərindən çerezləri deaktiv edə bilər, lakin bu halda saytın bəzi funksiyaları məhdudlaşa bilər.
                        </p>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-3 text-lg text-muted-foreground">
                        <h2 className="text-2xl font-bold text-foreground">10. Uşaqların Məlumatları</h2>
                        <p>
                           BioScript yalnız 18 yaşdan yuxarı istifadəçilərə yönəldilmişdir. 18 yaşdan aşağı şəxslər platformada valideynləri ilə qeydiyyatdan keçə bilər.
                        </p>
                      </motion.div>
                      
                       <motion.div variants={itemVariants} className="space-y-3 text-lg text-muted-foreground">
                        <h2 className="text-2xl font-bold text-foreground">11. Siyasətə Dəyişikliklər</h2>
                        <p>
                           Gizlilik siyasətimiz vaxtaşırı yenilənə bilər. Əhəmiyyətli dəyişikliklər olduqda istifadəçilərə e-poçt vasitəsilə məlumat veriləcək.
                        </p>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-3 text-lg text-muted-foreground">
                        <h2 className="text-2xl font-bold text-foreground">Əlaqə</h2>
                        <p>BioScript</p>
                        <ul className="list-none space-y-2">
                           <li>Naxçıvan şəhəri, Əziz Əliyev küçəsi, 4</li>
                           <li>📞 Telefon: +994 60 528 55 05</li>
                           <li>📧 E-poçt: info@bioscript.shop</li>
                           <li>🌐 Veb sayt: www.bioscript.shop</li>
                        </ul>
                      </motion.div>
                    </motion.div>
                </div>
            </section>
        </main>
        <Footer />
    </div>
  );
}
