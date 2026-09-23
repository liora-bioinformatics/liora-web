/* =========================================================
   Liora Bioinformatics — lightweight EN/DE i18n
   English is read from the page itself; this file supplies
   the German strings. Add data-i18n / data-i18n-html /
   data-i18n-attr attributes in the HTML to mark text.
   ========================================================= */
(function () {
  "use strict";

  var STORAGE_KEY = "liora-lang";

  var de = {
    "doc.title": "Liora Bioinformatics — Next-Gen-Lösungen für Life-Science-Daten",
    "meta.desc": "Liora Bioinformatics entwickelt maßgeschneiderte Pipelines, Software und Analyselösungen für die Life-Science-Forschung. Wenn Experimente skalieren, muss die Analyse mitwachsen.",

    "nav.home": "Startseite",
    "nav.about": "Über uns",
    "nav.services": "Leistungen",
    "nav.products": "Produkte",
    "nav.team": "Team",
    "nav.contact": "Kontakt",
    "nav.getintouch": "Kontakt aufnehmen",
    // "nav.backhome": "Startseite",

    "hero.badge": "Next-Gen-Lösungen &middot; Made in Germany",
    "hero.title": "Bioinformatik, die aus komplexen Daten klare Entscheidungen macht.",
    "hero.tagline": "Wenn Experimente skalieren, muss die Analyse mitwachsen.",
    "hero.lead": "Liora Bioinformatics unterstützt Forschungsteams und Labore dabei, maßgeschneiderte Pipelines zu entwickeln, verlässliche Software zu bauen und Analysen zu liefern, auf die man sich verlassen kann — als Brücke zwischen fundierter Wissenschaft und realer Wirkung.",
    "hero.cta1": "Unsere Leistungen",
    "hero.cta2": "Unsere Software",
    "hero.cta3": "PhyloTrace",
    "hero.meta1": "In der Forschung verwurzelt",
    "hero.meta2": "Reproduzierbar & offen im Prinzip",
    "hero.meta3": "R- & Python-Expertise",

    "dna.eyebrow": "Das ist unsere DNA",
    "dna.title": "Wissenschaftliche Tiefe trifft technische Präzision.",
    "dna.p1": "Unsere Wurzeln liegen an der Hochschule Furtwangen im Schwarzwald — in einer Hightech-Region, die oft „Inventors' Belt“ genannt wird. Liora entstand aus einer Forschungsgruppe für Data Science in den Life Sciences am Institut für Präzisionsmedizin, wo sich unsere Gründer beim Lösen realer Datenprobleme mit internationalen Wissenschaftlern kennenlernten.",
    "dna.p2": "Wir haben Liora Bioinformatics gegründet, um diese Wirkung über die Wissenschaft hinaus zu tragen: wissenschaftliche Sorgfalt verbunden mit Innovation und Präzision — und verlässliche Bioinformatik für die Teams, die sie brauchen.",
    "dna.li1": "Verankert in Präzisionsmedizin und Life-Science-Forschung",
    "dna.li2": "Verpflichtet zu Open Science und reproduzierbaren Methoden",
    "dna.li3": "Interdisziplinär: Biologie, Medizin, Statistik und Code",
    "dna.mapalt": "Liora Bioinformatics hat seinen Sitz in Deutschland",

    "svc.eyebrow": "Was wir tun",
    "svc.title": "Vier Wege, wie wir Ihre Wissenschaft beschleunigen.",
    "svc.lead": "Von der einzelnen Analyse bis zur voll gewarteten Plattform — wir holen Sie dort ab, wo Ihr Projekt steht.",
    "svc1.title": "Maßgeschneiderte Pipelines",
    "svc1.p": "Schluss mit dem Anpassen an generische Tools. Wir entwickeln maßgeschneiderte Pipelines, die schnell laufen, sich intuitiv anfühlen und zu den Anforderungen Ihres Labors passen.",
    "svc1.t1": "Automatisierte Analysen", "svc1.t2": "Intuitive Bedienung", "svc1.t3": "Robuste Ergebnisse",
    "svc2.title": "Beratung & Forschung",
    "svc2.p": "Mehr als nur eine Pipeline? Wir kooperieren in der bioinformatischen F&E, um Next-Gen-Analyselösungen zu entwerfen, zu prototypisieren und zu liefern.",
    "svc2.t1": "Methodik", "svc2.t2": "KI & maschinelles Lernen", "svc2.t3": "Verlässliche Statistik",
    "svc3.title": "Software & Dashboards",
    "svc3.p": "Wir stellen etablierte Open-Source-Bioinformatik-Tools mit vollständigem Lifecycle-Support bereit — einsatzbereit und von unserem Team gepflegt.",
    "svc3.t1": "Grafische Oberfläche", "svc3.t2": "Wartung & Support", "svc3.t3": "Deployment & Schulung",
    "svc4.title": "Datenanalyse",
    "svc4.p": "Wir verwandeln Ihre Rohdaten in belastbare Erkenntnisse — von statistischen Modellen bis zur Analyse komplexer Omics-Daten.",
    "svc4.t1": "Fortgeschrittene Statistik", "svc4.t2": "Technische Berichte", "svc4.t3": "Data Storytelling",

    "prod.eyebrow": "Unsere Software",
    "prod.title": "Tools, die wir bauen und langfristig pflegen.",
    "prod.lead": "Von uns entwickelte Software und Toolkits, werden über ihren gesamten Lebenszyklus unterstützt.",
    "prod.kicker": "Flaggschiff-Plattform &middot; Molekulare Epidemiologie",
    "prod.ptp": "Eine All-in-One-Plattform, um dezentrale, bakterielle Surveillance durchzuführen und zu verwalten. PhyloTrace vereint ein Toolkit an Analysen — darunter gehashte cgMLST-Typisierung und Screening auf antimikrobielle Resistenzen — in einer intuitiven Oberfläche.",
    "prod.cta1": "Software-Porträt ansehen",
    "prod.cta2": "Demo anfragen",
    "tool.mkinfer.cat": "Statistik &middot; Klinische Studien",
    "tool.mkinfer.p": "Umfassende Sammlung von Methoden zur statistischen Analyse klinischer Daten und biomedizinischer Experimente.",
    "tool.lfapp.cat": "Bildanalyse &middot; Lateral Flow",
    "tool.lfapp.p": "Modulare Anwendung zur quantitativen Bildanalyse von Lateral-Flow-Assays.",
    "tool.kiwiflow.cat": "Massenspektrometrie &middot; Proteomik",
    "tool.kiwiflow.p": "Interaktive Pipeline zur Verarbeitung und Analyse proteomischer Massenspektrometrie-Assays.",
    "tool.mkomics.cat": "Omics &middot; Verarbeitung &middot; QC",
    "tool.mkomics.p": "Toolkit für Qualitätskontrolle, Verarbeitung und Auswertung von Omics-Experimenten.",
    "tool.madapp.cat": "Micro-Arrays &middot; Bildanalyse",
    "tool.madapp.p": "Intuitiver Workflow zur bildbasierten Analyse von Microarrays.",
    "tool.mkpower.cat": "Statistik &middot; Studiendesign",
    "tool.mkpower.p": "Power-Analyse und Fallzahlberechnung für Experimente, diagnostische Studien und klinische Bewertungen.",

    "why.eyebrow": "Warum mit uns arbeiten",
    "why.title": "Forschungsqualität, geliefert wie ein Produkt.",
    "why1.title": "Wissenschaftler, nicht nur Entwickler",
    "why1.p": "Wir verstehen Ihre Daten, weil wir selbst damit gearbeitet haben.",
    "why2.title": "Reproduzierbar by Design",
    "why2.p": "Jeder Workflow ist transparent, versioniert und wiederholbar aufgebaut — damit Ergebnisse standhalten.",
    "why3.title": "Langfristig unterstützt",
    "why3.p": "Wir pflegen, was wir bauen, und halten Tools weit über die erste Lieferung hinaus gesund und sicher.",

    "team.eyebrow": "Die Menschen",
    "team.title": "Gründer, die Wissenschaft und Software verbinden.",
    "team.mk.role": "Wissenschaftlicher Senior-Berater",
    "team.mk.p": "Als anerkannter Experte für Mathematik in Biologie und Medizin leitet Matthias unsere Initiativen in Statistik und Data Science. Er hat mehrere Bücher verfasst und pflegt über 30 Software-Pakete — neben seiner Professur und Forschungsgruppe am Institut für Präzisionsmedizin der Hochschule Furtwangen.",
    "team.fp.role": "Chief Technology Officer",
    "team.fp.p": "Als Mediziner und Datenanalyst verbindet Filip biomedizinische Forschung mit wissenschaftlichem Rechnen. Mit einem Hintergrund in der Medizin und einem Promotionsschwerpunkt in biomedizinischer Bildanalyse entwickelt er interaktive Anwendungen und reproduzierbare Workflows in R und Python.",
    "team.mf.role": "Chief Executive Officer",
    "team.mf.p": "Marian bringt eine vielseitige Leidenschaft für Wissenschaft, Technologie und Innovation ein. Mit einem Hintergrund in personalisierter Medizin und Bioinformatik — von Hochdurchsatz-Wirkstoffforschung bis zu mikrobieller Genomik — prägt sein interdisziplinäres Denken die Ausrichtung des Unternehmens.",

    "contact.title": "Sprechen wir über Ihre Datenherausforderung.",
    "contact.p": "Ob Sie eine Pipeline, eine Software oder einen Forschungspartner brauchen — wir hören gern, woran Sie arbeiten.",
    "contact.cta1": "Kontakt aufnehmen",
    "contact.cta2": "Leistungen entdecken",

    "footer.tagline": "Next-Gen-Bioinformatik-Lösungen für die Life-Science-Forschung. Made in Germany.",
    "footer.company": "Unternehmen",
    "footer.about": "Über uns",
    "footer.team": "Team",
    "footer.contact": "Kontakt",
    "footer.services": "Leistungen",
    "footer.svc1": "Maßgeschneiderte Pipelines",
    "footer.svc2": "Beratung & Forschung",
    "footer.svc3": "Software & Dashboards",
    "footer.svc4": "Datenanalyse",
    "footer.products": "Produkte",
    "footer.allsoftware": "Alle Software",
    "footer.rights": "Liora Bioinformatics. Alle Rechte vorbehalten.",
    "footer.home": "Liora Startseite",
    "footer.imprint": "Impressum",
    "footer.privacy": "Datenschutz",
    "footer.legalcol": "Rechtliches",

    "cp.eyebrow": "Kontakt",
    "cp.title": "Sprechen wir über Ihre Arbeit.",
    "cp.lead": "Füllen Sie das Formular aus oder schreiben Sie uns direkt — wir antworten in der Regel innerhalb von 24 Stunden.",
    "cp.info.email.h": "E-Mail",
    "cp.info.loc.h": "Standort",
    "cp.info.loc.p": "Villingen-Schwenningen, Deutschland",
    "cp.info.resp.h": "Antwortzeit",
    "cp.info.resp.p": "Meist innerhalb von 24 Stunden",
    "cp.info.social.h": "Anderswo",
    "cf.name": "Ihr Name",
    "cf.name.ph": "Max Mustermann",
    "cf.email": "Ihre E-Mail",
    "cf.email.ph": "max.mustermann@beispiel.de",
    "cf.topic": "Thema",
    "cf.topic.ph": "Anfrage zu Leistungen / Zusammenarbeit",
    "cf.institute": "Institut / Unternehmen (optional)",
    "cf.institute.ph": "ABC Universität / XYZ GmbH",
    "cf.message": "Ihre Nachricht",
    "cf.message.ph": "Wie können wir helfen?",
    "cf.submit": "Nachricht senden",
    "cf.privacy": "Wir verarbeiten die hier eingegebenen Angaben, um Ihre Anfrage zu beantworten. Informationen dazu, wie wir mit Ihren Daten umgehen und welche Rechte Sie haben, finden Sie in unserer <a href=\"/privacy\">Datenschutzerklärung</a>.",

    "imp.eyebrow": "Rechtliche Hinweise",
    "imp.s1h": "Angaben gemäß § 5 DDG",
    "imp.provider": "<strong>Diensteanbieter:</strong><br /> Liora Bioinformatics UG (haftungsbeschränkt)<br /> Armlederstrasse 17<br /> 78628 Rottweil<br /> Deutschland<br /><br /> <strong>Vertreten durch:</strong><br /> Geschäftsführer: Marian Freisleben<br /><br /> <strong>Registereintrag:</strong><br /> Registergericht: Amtsgericht Stuttgart<br /> Registernummer: HRB 807677",
    "imp.contacth": "Kontakt",
    "imp.contactp": "E-Mail: <a href=\"mailto:marian.freisleben@liora-bioinformatics.com\">marian.freisleben@liora-bioinformatics.com</a>",
    "imp.vath": "Umsatzsteuer",
    "imp.vatp": "Gemäß § 19 UStG (Kleinunternehmerregelung) wird keine Umsatzsteuer berechnet und in unseren Rechnungen nicht ausgewiesen.",
    "imp.resph": "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
    "imp.respp": "Marian Freisleben<br /> c/o Liora Bioinformatics UG (haftungsbeschränkt)<br /> Armlederstrasse 17<br /> 78628 Rottweil<br /> Deutschland",
    "imp.disph": "Streitschlichtung",
    "imp.dispp2": "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    "imp.conth": "Haftung für Inhalte",
    "imp.contp1": "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
    "imp.contp2": "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
    "imp.linkh": "Haftung für Links",
    "imp.linkp1": "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.",
    "imp.linkp2": "Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
    "imp.copyh": "Urheberrecht",
    "imp.copyp1": "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.",
    "imp.copyp2": "Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie dennoch auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.",
    "pp.eyebrow": "DSGVO · BDSG",
    "pp.s1h": "1. Verantwortlicher",
    "pp.s1p": "Verantwortlicher für die Verarbeitung Ihrer personenbezogenen Daten auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) und des Bundesdatenschutzgesetzes (BDSG) ist:",
    "pp.controller": "Liora Bioinformatics UG (haftungsbeschränkt)<br /> Armlederstrasse 17<br /> 78628 Rottweil<br /> Deutschland<br /><br /> Vertreten durch den Geschäftsführer: Marian Freisleben<br /> Registergericht: Amtsgericht Stuttgart<br /> Registernummer: HRB 807677<br /> E-Mail: <a href=\"mailto:marian.freisleben@liora-bioinformatics.com\">marian.freisleben@liora-bioinformatics.com</a>",
    "pp.s2h": "2. Geltungsbereich dieser Datenschutzerklärung",
    "pp.s2p1": "Diese Datenschutzerklärung informiert Sie über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten auf unserer Website und im Zusammenhang mit unseren Leistungen. Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person (nachfolgend „betroffene Person“) beziehen.",
    "pp.s2p2": "Wir sind dem Schutz Ihrer Privatsphäre verpflichtet und behandeln Ihre personenbezogenen Daten verantwortungsvoll und im Einklang mit der DSGVO und dem BDSG.",
    "pp.s3h": "3. Welche Daten wir erheben und verarbeiten",
    "pp.s3p": "Wir erheben und verarbeiten personenbezogene Daten nur in dem Umfang, in dem dies erforderlich ist, und für die Zwecke, für die sie erhoben wurden.",
    "pp.s3ah": "a) Server-Logdaten",
    "pp.s3ap": "Wenn Sie unsere Website besuchen, erhebt und speichert unser Hosting-Anbieter automatisch Informationen in sogenannten Server-Logdateien, die Ihr Browser automatisch an uns übermittelt. Diese Daten umfassen:",
    "pp.log1": "IP-Adresse",
    "pp.log2": "Datum und Uhrzeit der Serveranfrage",
    "pp.log3": "Browsertyp und -version",
    "pp.log4": "Verwendetes Betriebssystem",
    "pp.log5": "Referrer-URL (die zuvor besuchte Seite)",
    "pp.log6": "Hostname des zugreifenden Rechners",
    "pp.log7": "HTTP-Statuscode",
    "pp.s3a.purpose": "<strong>Zweck der Verarbeitung:</strong> Diese Daten werden für wesentliche technische und sicherheitsbezogene Zwecke verarbeitet, etwa zur Aufrechterhaltung der Stabilität, Sicherheit und Leistung unserer Website sowie zur Erkennung und Abwehr technischer Störungen oder böswilliger Angriffe.",
    "pp.s3a.legal": "<strong>Rechtsgrundlage:</strong> Die Verarbeitung der Server-Logdaten beruht auf unserem berechtigten Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der Gewährleistung des funktionsfähigen Betriebs und der Sicherheit unserer Website.",
    "pp.s3a.retention": "<strong>Speicherdauer:</strong> Server-Logdaten werden für den zur Erfüllung dieser Betriebs- und Sicherheitszwecke unbedingt erforderlichen Zeitraum gespeichert, in der Regel bis zu 6 Monate, oder gemäß den Richtlinien unseres Hosting-Anbieters und geltenden gesetzlichen Pflichten. In Ausnahmefällen kann eine längere Speicherung zu Beweiszwecken erfolgen, etwa im Falle eines Sicherheitsvorfalls oder vermuteten Missbrauchs.",
    "pp.s3bh": "b) Kontaktformulardaten",
    "pp.s3bp": "Wenn Sie unser Kontaktformular nutzen, erheben wir die personenbezogenen Daten, die Sie in die Eingabemaske eingeben. Dazu gehören in der Regel:",
    "pp.cf1": "Ihr Name",
    "pp.cf2": "Ihre E-Mail-Adresse",
    "pp.cf3": "Der Betreff Ihrer Anfrage",
    "pp.cf4": "Der Inhalt Ihrer Nachricht",
    "pp.s3b.purpose": "<strong>Zweck der Verarbeitung:</strong> Die über das Kontaktformular übermittelten personenbezogenen Daten werden ausschließlich zur Beantwortung Ihrer Anfrage und zur Ermöglichung einer ersten Kommunikation für potenzielle Geschäftsbeziehungen (vorvertragliche Schritte) verarbeitet.",
    "pp.s3b.legal": "<strong>Rechtsgrundlage:</strong> Die Verarbeitung Ihrer Kontaktformulardaten beruht auf Maßnahmen, die auf Ihre Anfrage hin vor Vertragsabschluss erfolgen, gemäß Art. 6 Abs. 1 lit. b DSGVO, da Ihre Anfrage zu einer potenziellen Geschäftsbeziehung führen kann. Bei allgemeinen Anfragen, die nicht unmittelbar zu einem Vertrag führen, ist die Rechtsgrundlage unser berechtigtes Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO, mit Interessenten zu kommunizieren und Anfragen zu beantworten.",
    "pp.s3b.retlabel": "<strong>Speicherdauer:</strong>",
    "pp.s3b.ret1": "<strong>Führt Ihre Anfrage nicht zu einem Vertragsverhältnis:</strong> Ihre Daten werden so lange gespeichert, wie es zur vollständigen Bearbeitung Ihrer Anfrage und für einen angemessenen Nachverfolgungszeitraum erforderlich ist, in der Regel nicht länger als 12 Monate nach der letzten Kommunikation.",
    "pp.s3b.ret2": "<strong>Führt Ihre Anfrage zu einem Vertragsverhältnis:</strong> Ihre Daten werden in unsere Kundenunterlagen aufgenommen. Die Speicherung richtet sich dann nach den für Vertragsunterlagen geltenden Aufbewahrungsfristen, die aufgrund handels- und steuerrechtlicher Pflichten in Deutschland (z. B. § 257 HGB, § 147 AO) bis zu 10 Jahre betragen können. Bei anhängigen Rechtsstreitigkeiten oder behördlichen Ermittlungen können Daten für die Dauer solcher Verfahren zuzüglich etwaiger Verjährungsfristen aufbewahrt werden.",
    "pp.s4h": "4. Weitergabe von Daten an Dritte",
    "pp.s4p": "Wir geben Ihre personenbezogenen Daten nur dann an Dritte weiter, wenn dies für die genannten Zwecke erforderlich ist, eine andere Rechtsgrundlage besteht oder Sie ausdrücklich eingewilligt haben.",
    "pp.s4l1": "<strong>Hosting-Anbieter:</strong> Diese Website wird auf GitHub Pages gehostet, betrieben von GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. GitHub verarbeitet die oben beschriebenen Server-Logdaten bei der Auslieferung unserer Seiten. GitHub, Inc. ist unter dem EU-US Data Privacy Framework zertifiziert.",
    "pp.s4l2": "<strong>Formularverarbeitung:</strong> Kontaktformular-Einsendungen werden in unserem Auftrag von Teijal, Inc. d/b/a Formcarry, 3 Germay Dr, Unit 4 #1278, Wilmington, DE 19804, USA verarbeitet, ausschließlich um uns Ihre Nachricht per E-Mail zuzustellen. Die übermittelten Daten werden auf Servern innerhalb der Europäischen Union (Frankfurt am Main, Deutschland) gespeichert. Ein Auftragsverarbeitungsvertrag einschließlich der Standardvertragsklauseln der Europäischen Kommission ist Bestandteil der Nutzungsbedingungen dieses Anbieters. Der Anbieter setzt weitere Unterauftragsverarbeiter ein, unter anderem Amazon Web Services für die Speicherung und Automattic (Akismet) für die Spam-Filterung.",
    "pp.s4l3": "<strong>Spam-Schutz:</strong> Unser Kontaktformular ist durch ein verstecktes, im Browser ausgewertetes Formularfeld sowie durch die Spam-Filterung unseres Formular-Dienstleisters gegen automatisierten Missbrauch geschützt. Wir setzen weder Google reCAPTCHA noch einen vergleichbaren Captcha-Dienst Dritter ein; zu diesem Zweck werden keine Daten an Google übermittelt.",
    "pp.s5h": "5. Internationale Datenübermittlungen",
    "pp.s6h": "6. Ihre Rechte nach der DSGVO",
    "pp.s6p": "Als betroffene Person haben Sie nach der DSGVO umfassende Rechte in Bezug auf Ihre personenbezogenen Daten. Wir sind bestrebt, die Ausübung dieser Rechte zu erleichtern. Bitte beachten Sie, dass diese Rechte nicht uneingeschränkt gelten und bestimmten Bedingungen oder Ausnahmen der DSGVO unterliegen können. Sie haben das Recht auf:",
    "pp.r1": "<strong>Auskunft (Art. 15 DSGVO):</strong> eine Bestätigung darüber zu erhalten, ob Sie betreffende personenbezogene Daten verarbeitet werden, sowie Auskunft über diese Daten und deren Verarbeitung.",
    "pp.r2": "<strong>Berichtigung (Art. 16 DSGVO):</strong> die Berichtigung unrichtiger personenbezogener Daten und die Vervollständigung unvollständiger Daten zu verlangen.",
    "pp.r3": "<strong>Löschung (Art. 17 DSGVO):</strong> die Löschung personenbezogener Daten zu verlangen, sofern einer der in der DSGVO genannten Gründe zutrifft.",
    "pp.r4": "<strong>Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> die Einschränkung der Verarbeitung zu verlangen, sofern eine der Voraussetzungen der DSGVO vorliegt.",
    "pp.r5": "<strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> die von Ihnen bereitgestellten Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.",
    "pp.r6": "<strong>Widerspruch (Art. 21 DSGVO):</strong> aus Gründen, die sich aus Ihrer besonderen Situation ergeben, der auf berechtigten Interessen beruhenden Verarbeitung zu widersprechen.",
    "pp.r7": "<strong>Widerruf der Einwilligung (Art. 7 Abs. 3 DSGVO):</strong> eine erteilte Einwilligung jederzeit zu widerrufen, ohne dass die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung berührt wird.",
    "pp.r8": "<strong>Beschwerde (Art. 77 DSGVO):</strong> Beschwerde bei einer Aufsichtsbehörde einzulegen.",
    "pp.s6auth": "Die zuständige Aufsichtsbehörde für Liora Bioinformatics ist:",
    "pp.authaddr": "Landesbeauftragter für den Datenschutz und die Informationsfreiheit Baden-Württemberg (LfDI Baden-Württemberg)<br /> Lautenschlagerstraße 20<br /> 70173 Stuttgart<br /> Deutschland<br /> Telefon: +49 711/61 55 41 – 0<br /> E-Mail: <a href=\"mailto:poststelle@lfdi.bwl.de\">poststelle@lfdi.bwl.de</a>",
    "pp.s7h": "7. Datensicherheit",
    "pp.s7p": "Wir treffen geeignete technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten, einschließlich Maßnahmen zum Schutz personenbezogener Daten vor unbeabsichtigter oder unrechtmäßiger Zerstörung, Verlust, Veränderung, unbefugter Offenlegung oder unbefugtem Zugriff. Bitte beachten Sie jedoch, dass die Datenübertragung über das Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein vollständiger Schutz der Daten vor dem Zugriff Dritter ist nicht möglich.",
    "pp.s8h": "8. Änderungen dieser Datenschutzerklärung",
    "pp.s8p": "Wir behalten uns vor, diese Datenschutzerklärung von Zeit zu Zeit anzupassen, um Änderungen unserer Datenverarbeitungspraktiken, rechtlicher Anforderungen oder neuer Technologien Rechnung zu tragen. Die aktualisierte Datenschutzerklärung wird auf unserer Website veröffentlicht. Wir empfehlen Ihnen, diese Datenschutzerklärung regelmäßig zu prüfen.",

    "pkg.resources": "Ressourcen",
    "pkg.about": "Über",
    "pkg.install": "Installation",
    "pkg.back": "Zurück zu allen Programmen",
    "pkg.gh": "Auf GitHub ansehen",
    "pkg.cran": "Auf CRAN ansehen",
    "pkg.docs": "Dokumentation",
    "pkg.ghprofile": "Autor auf GitHub",
    "pkg.contact": "Nach diesem Tool fragen",
    "pkg.related": "Weitere Software von Liora",

    /* --- PhyloTrace Translations --- */
    "pkg.phylotrace.cat": "Überwachung bakterieller Populationen",
    "pkg.phylotrace.tag": "Die Next-Gen-Plattform für dezentrale Erregerüberwachung und epidemiologische Surveillance. PhyloTrace ist eine Open-Source-Desktopanwendung mit grafischer Benutzeroberfläche und Funktionen für die Zusammenarbeit im Team.",
    "pkg.phylotrace.call": "Auf Anfrage werden binäre Installationsdateien kostenlos zur Verfügung gestellt.",
    "pkg.phylotrace.f1": "Core-Genome Multilocus Sequence Typing (cgMLST und MLST)",
    "pkg.phylotrace.f2": "Screening auf Resistenzen, Virulenz und Punktmutationen",
    "pkg.phylotrace.f3": "Integrierte Datenbankverwaltung",
    "pkg.phylotrace.f4": "Einfacher Datenaustausch für kollaborative Surveillance",
    "pkg.phylotrace.f5": "Netzwerk- und phylogenetische Stammbaum-Graphen",
    "pkg.phylotrace.f6": "Räumliche und zeitliche Kartierung",
    "pkg.phylotrace.f7": "Gehashte Genomdaten und Herkunftsnachweis",
    "pkg.phylotrace.f8": "Unterstützung für benutzerdefinierte Datenannotation",
    "pkg.phylotrace.f9": "Dashboard für reproduzierbare Analysen",

    "pkg.f1.title": "Core-Genome Multilocus Sequence Typing (cgMLST und MLST)",
    "pkg.f1.desc": "Hochauflösende Stammtypisierung mittels standardisierter cgMLST- und klassischer MLST-Schemata. Automatische Profilierung von Zielgen-Loci zur Identifizierung von Subspezies-Liniendifferenzierungen und Ausbruchs-Clustern.",
    "pkg.f1.desc_start": "Hochauflösende Stammtypisierung mittels standardisierter cgMLST- und klassischer MLST-Schemata. Derzeit können alle 40 bakteriellen Schemata mit ",
    "pkg.f1.desc_end": " verbunden werden und werden kontinuierlich aktualisiert. Unterstützung für benutzerdefinierte Schemata oder andere Datenbanken wie ",
    "pkg.f1.desc_pubmlst": " wird in Kürze hinzugefügt.",
    "pkg.f2.title": "Screening auf Resistenzen, Virulenz und Punktmutationen",
    "pkg.f2.desc": "Durchsuchen Sie Genomassemblies gegen kuratierte Resistenzgen-Datenbanken, Virulenzfaktor-Register und Punktmutations-Panels, um antimikrobielle Resistenzmechanismen sofort zu erkennen.",
    "pkg.f3.title": "Integrierte Datenbankverwaltung",
    "pkg.f3.desc": "Zentrale lokale oder serverbasierte Speicherung für skalierbare Isolatverwaltung, Indizierung, schnelle Abfragen und nahtlose Hintergrundsynchronisationen ohne externe Abhängigkeiten.",
    "pkg.f4.title": "Kollaborativer Datenimport und -export",
    "pkg.f4.desc": "Die Schnittstelle für den Datenaustausch ermöglicht einen nahtlosen Transfer zwischen Partnerlaboren über SQLite und weitere Standardformate. Sie entscheiden selbst, welche Daten Sie teilen – auch datenschutzrelevante Angaben. Da PhyloTrace lokal und ohne öffentliche Server läuft, bleiben private Daten geschützt.",
    "pkg.f5.title": "Netzwerk- und phylogenetische Baumdiagramme",
    "pkg.f5.desc": "Verfolgen Sie Übertragungsmuster und Populationsdynamiken mit interaktiven Visualisierungen von Single-Linkage-Netzwerken (MST) und hierarchischen Bäumen (NJ, UPGMA) – mit frei anpassbaren Layouts, Clustering und flexibler Variablenzuordnung.",
    "pkg.f6.title": "Räumliche und zeitliche Kartierung",
    "pkg.f6.desc": "Verfolgen Sie Übertragungsereignisse in geografischen und zeitlichen Kontexten. Nutzen Sie interaktive, zeitaufgelöste Karten-Overlays und Epidemiekurven, um die Dynamik von Erregern nachzuvollziehen. Die durchdachte Visualisierungsoberfläche hilft dabei, Muster aufzudecken, die in Tabellenkalkulationen sonst verborgen blieben.",
    "pkg.f7.title": "Gehashte Genomdaten und Herkunftsnachweis",
    "pkg.f7.desc": "Kryptographisches Hashing garantiert Datenintegrität und manipulationssichere Probenverfolgung. Vollständige Audit-Logs bewahren den Herkunftsnachweis für die Einhaltung von Compliance- und Regulierungskriterien.",
    "pkg.f8.title": "Unterstützung für benutzerdefinierte Datenannotation",
    "pkg.f8.desc": "Fügen Sie Probenaufzeichnungen benutzerdefinierte klinische Metadaten, Umweltvariablen oder Einrichtungs-IDs hinzu, um Analyse-Workflows dynamisch zu gruppieren und zu filtern.",
    "pkg.f9.title": "Analyse-Dashboard",
    "pkg.f9.desc": "Routinemäßige Überwachung oder retrospektive Analysen können mit dem Analyse-Dashboard verwaltet und gruppiert werden. Das Untergliedern verfügbarer Isolates oder das Erstellen von Snapshots aktueller Datenbankzustände macht Analysen reproduzierbar und teilbar.",

    "tool.mkdescr.cat": "Statistik &middot; Deskriptive Statistik",
    "tool.mkdescr.p": "Funktionen zur Berechnung und Visualisierung robuster, standardisierter deskriptiver Statistiken.",
    "tool.robrmx.cat": "Statistik &middot; Robuste Schätzung",
    "tool.robrmx.p": "Schnelle, optimal robuste Schätzer für verlässliche Parameterschätzung bei Modellabweichungen.",
    "pkg.mkinfer.cat": "R-Paket · Inferenzstatistik",
    "pkg.mkinfer.tag": "Inferenzstatistik für reale Daten — Bootstrap-, Permutations- und imputationsbasierte Tests mit klaren Visualisierungen.",
    "pkg.mkinfer.about": "MKinfer bietet ein breites Spektrum an Inferenzmethoden — darunter bootstrappte Konfidenzintervalle und zahlreiche robuste und exakte Testverfahren — entwickelt und gepflegt von Prof. Matthias Kohl. Läuft ab R 4.0.",
    "pkg.mkinfer.f1": "Bootstrap-, Permutations- und Hsu-t-Tests sowie Intersection-Union-Tests",
    "pkg.mkinfer.f2": "Multiple-Imputation-t- und Wilcoxon-Tests für unvollständige Daten",
    "pkg.mkinfer.f3": "Volcano-, Bland-Altman- und Mittelwertdifferenz-Diagramme",
    "pkg.mkdescr.cat": "R-Paket · Deskriptive Statistik",
    "pkg.mkdescr.tag": "Robuste, standardisierte deskriptive Statistik und übersichtliche Visualisierungen.",
    "pkg.mkdescr.about": "MKdescr bietet Funktionen zur Berechnung und Visualisierung robuster, standardisierter deskriptiver Statistiken und gehört zur MK-Toolkit-Familie von Matthias Kohl. Verfügbar auf CRAN und GitHub.",
    "pkg.mkdescr.f1": "Robuste und standardisierte deskriptive Kennzahlen",
    "pkg.mkdescr.f2": "Anschauliche statistische Diagramme und Transformationen",
    "pkg.mkdescr.f3": "Hilfs-Achsenskalen für klarere Grafiken",
    "pkg.mkpower.cat": "R-Paket · Studiendesign & Power",
    "pkg.mkpower.tag": "Power-Analyse und Fallzahlberechnung für Experimente, diagnostische Studien und klinische Bewertungen.",
    "pkg.mkpower.about": "MKpower unterstützt eine sorgfältige Studienplanung durch analytische und simulationsbasierte Power- und Fallzahlberechnung. Gepflegt von Matthias Kohl; verfügbar auf CRAN und GitHub.",
    "pkg.mkpower.f1": "Power und Fallzahl für Welch- und Hsu-t-Tests",
    "pkg.mkpower.f2": "Monte-Carlo-Simulation von empirischer Power und Typ-I-Fehler",
    "pkg.mkpower.f3": "Planung von Wilcoxon-Rangsummen- und Vorzeichen-Rang-Tests",
    "pkg.mkomics.cat": "R-Paket · Omics · QC",
    "pkg.mkomics.tag": "Qualitätskontrolle, Verarbeitung und Auswertung von Omics-Experimenten.",
    "pkg.mkomics.about": "MKomics bündelt praktische Werkzeuge für Qualitätskontrolle und Analyse von Hochdurchsatz-Omics-Daten — von der Heatmap-Farbgebung bis zu moderierten Statistiken. Auf CRAN und GitHub.",
    "pkg.mkomics.f1": "Ähnlichkeitsdiagramme auf Basis von Korrelation und MAD",
    "pkg.mkomics.f2": "Moderierte t-Tests über eine vereinfachte limma-Schnittstelle",
    "pkg.mkomics.f3": "Replikat-Aggregation, Fold-Changes und ANOVA-Hilfen",
    "pkg.robrmx.cat": "R-Paket · Robuste Schätzung",
    "pkg.robrmx.tag": "Radius-Minimax-(robrmx-)Schätzer — optimal robuste Schätzung für parametrische Modelle.",
    "pkg.robrmx.about": "robrmx implementiert Radius-Minimax-Schätzer, eine Klasse optimal robuster Verfahren (Kohl 2005; Rieder et al. 2008), mit Diagnostik und Endliche-Stichproben-Korrekturen. Entwicklungsversion auf GitHub.",
    "pkg.robrmx.f1": "Asymptotisch lineare Schätzer für infinitesimale Umgebungen",
    "pkg.robrmx.f2": "Endliche-Stichproben-Korrekturen und Diagnosediagramme",
    "pkg.robrmx.f3": "Verlässliche Schätzungen bei Modellabweichungen und Ausreißern",
    "pkg.lfapp.cat": "Shiny-App · Lateral-Flow-Assays",
    "pkg.lfapp.tag": "Quantitative Bildanalyse von Lateral-Flow-Assays — segmentieren, korrigieren, extrahieren und kalibrieren.",
    "pkg.lfapp.about": "LFApp ist eine modulare Sammlung von Shiny-Apps zur quantitativen Analyse von Lateral-Flow-Assay-Bildern, von Filip Paskali, Weronika Schary und Matthias Kohl. Auf CRAN und GitHub, mit smartphone-basiertem Workflow.",
    "pkg.lfapp.f1": "Bildaufnahme, Gitterung und Hintergrundkorrektur",
    "pkg.lfapp.f2": "Intensitätsextraktion mit Datenimport und -export",
    "pkg.lfapp.f3": "Kalibrierung und Quantifizierung über lineare, loess- oder GAM-Modelle",
    "pkg.madapp.cat": "Shiny-App · Microarray-Bildanalyse",
    "pkg.madapp.tag": "Ein intuitiver Workflow für die bildbasierte Analyse von Microarrays.",
    "pkg.madapp.about": "MADapp bietet einen zugänglichen, bildbasierten Workflow für die Microarray-Analyse — im selben modularen Geist wie LFApp. Kontaktieren Sie uns für Details zur Verfügbarkeit.",
    "pkg.madapp.f1": "Geführter Bildimport und Definition der Region of Interest",
    "pkg.madapp.f2": "Hintergrundkorrektur und Intensitätsextraktion",
    "pkg.madapp.f3": "Strukturierter Export für die weitere Analyse",
    "pkg.kiwims.cat": "Anwendung · Proteomik · Massenspektrometrie",
    "pkg.kiwims.tag": "Eine interaktive Pipeline zur Verarbeitung und Analyse proteomischer Massenspektrometrie-Assays.",
    "pkg.kiwims.about": "KiwiMS (ehemals KiwiFlow) ist eine interaktive Pipeline, die die Verarbeitung und Analyse proteomischer Massenspektrometrie-Experimente vereinfacht. Kontaktieren Sie uns, um mehr zu erfahren oder Zugang anzufragen.",
    "pkg.kiwims.f1": "Optimierte Verarbeitung MS-basierter Proteomik-Daten",
    "pkg.kiwims.f2": "Interaktive Qualitätskontrolle und Visualisierung",
    "pkg.kiwims.f3": "Reproduzierbarer, geführter Analyse-Workflow",

    "pkg.builtwith": "Entwickelt mit",
    "cran.title": "CRAN-Downloads",
    "cran.src": "über den RStudio-Mirror",
    "cran.total": "Insgesamt",
    "cran.month": "Letzte 30 Tage",
    "cran.week": "Letzte 7 Tage",
    "cran.trend": "Monatliche Downloads, letzte 12 Monate",
    "pp.s4l4": "<strong>Download-Statistiken:</strong> Die auf unseren Softwarepaket-Seiten angezeigten Download-Zahlen stammen vom öffentlichen Dienst cranlogs (cranlogs.r-pkg.org). Wir rufen sie vorab ab und liefern sie von unserem eigenen Webspace aus; Ihr Browser kontaktiert diesen Dienst daher nicht und es werden keine Daten über Sie an ihn übermittelt.",
    "pp.updated": "Zuletzt aktualisiert: 19. August 2026",
    "pp.dpo": "Wir sind nicht verpflichtet, einen Datenschutzbeauftragten nach Art. 37 DSGVO bzw. § 38 BDSG zu benennen. Bitte richten Sie Fragen zum Datenschutz an die oben genannten Kontaktdaten.",
    "pp.s3ch": "c) Cookies und lokale Speicherung",
    "pp.s3cp1": "Wir verwenden keine Cookies und setzen auf dieser Website keinerlei Analyse-, Tracking-, Profiling- oder Werbetechnologien ein. Zu diesen Zwecken speichern wir keine Informationen auf Ihrem Endgerät.",
    "pp.s3cp2": "Unsere Website speichert genau einen Eintrag im lokalen Speicher (Local Storage) Ihres Browsers, der rein funktional ist:",
    "pp.ls1": "<code>liora-lang</code> &mdash; speichert, ob Sie über den Sprachumschalter Deutsch oder Englisch gewählt haben, damit Ihre Auswahl auf weiteren Seiten und bei späteren Besuchen erhalten bleibt. Er enthält nichts außer dem Wert <code>en</code> oder <code>de</code>.",
    "pp.s3c.legal": "<strong>Rechtsgrundlage:</strong> Dieser Eintrag ist unbedingt erforderlich, um einen von Ihnen ausdrücklich gewünschten Dienst bereitzustellen, und daher nach § 25 Abs. 2 Nr. 2 TDDDG einwilligungsfrei. Da wir keine einwilligungsbedürftigen Cookies oder Speicherzugriffe einsetzen, zeigt diese Website kein Einwilligungsbanner an.",
    "pp.s3c.delete": "Sie können diese lokal gespeicherte Information jederzeit über die Einstellungen Ihres Browsers löschen. Dies hat keine andere Auswirkung, als dass Ihre Sprachauswahl zurückgesetzt wird.",
    "pp.s4l5": "<strong>Software-Versionsinformationen:</strong> Auf unserer PhyloTrace-Seite ruft Ihr Browser die aktuelle Versionsnummer über die GitHub-API (api.github.com) ab, betrieben von GitHub, Inc. Ihre IP-Adresse wird dabei an GitHub übermittelt.",
    "pp.s4l6": "<strong>Schriftarten und weitere Inhalte:</strong> Sämtliche Schriftarten, Stylesheets, Skripte und Bilder dieser Website werden von unserem eigenen Webspace ausgeliefert. Wir binden weder Google Fonts noch einen vergleichbaren externen Schriftart-, Skript- oder Content-Delivery-Dienst ein; beim Besuch unserer Seiten werden daher keine Daten an solche Anbieter übermittelt.",
    "pp.s5p1": "Einige der oben genannten Anbieter sind Unternehmen mit Sitz in den Vereinigten Staaten, sodass Ihre personenbezogenen Daten (insbesondere Ihre IP-Adresse und Server-Logdaten) dorthin übermittelt werden können. Für solche Übermittlungen in ein Drittland außerhalb der Europäischen Union bzw. des Europäischen Wirtschaftsraums stellen wir geeignete Garantien nach Art. 44 ff. DSGVO sicher.",
    "pp.s5p2": "Für GitHub, Inc. stützen wir uns auf den Angemessenheitsbeschluss der Europäischen Kommission vom 10. Juli 2023 zum EU-US Data Privacy Framework, nach dem zertifizierte US-Unternehmen ein angemessenes Schutzniveau bieten. Ist ein Empfänger nicht nach diesem Rahmenwerk zertifiziert, erfolgen Übermittlungen auf Grundlage der von der Europäischen Kommission genehmigten Standardvertragsklauseln. Kontaktformulardaten werden innerhalb der Europäischen Union gespeichert; ein Zugriff durch US-Personal unseres Formularanbieters ist durch diese Standardvertragsklauseln abgedeckt.",
    "pp.objh": "Gesonderter Hinweis zu Ihrem Widerspruchsrecht (Art. 21 DSGVO)",
    "pp.objp": "<strong>Soweit wir Ihre personenbezogenen Daten auf Grundlage unserer berechtigten Interessen nach Art. 6 Abs. 1 lit. f DSGVO verarbeiten &mdash; namentlich die oben beschriebenen Server-Logdaten und allgemeinen Anfragen &mdash; haben Sie das Recht, dieser Verarbeitung jederzeit aus Gründen, die sich aus Ihrer besonderen Situation ergeben, zu widersprechen.</strong> Im Falle Ihres Widerspruchs verarbeiten wir die betroffenen Daten nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen. Der Widerspruch ist an keine Form gebunden; eine E-Mail an die in Abschnitt 1 genannte Adresse genügt.",
    "pkg.phylotrace.ruo": "Nur für Forschungszwecke. PhyloTrace ist kein Medizinprodukt und ist nicht für den Einsatz in diagnostischen Verfahren, zur Steuerung von Behandlungsentscheidungen oder für die Versorgung einzelner Patientinnen und Patienten bestimmt.",
    "imp.attrh": "Danksagungen und Lizenzen Dritter",
    "imp.attr.r": "Das R-Logo ist &copy; 2016 The R Foundation. Es wird hier unverändert unter der <a href=\"https://creativecommons.org/licenses/by-sa/4.0/deed.de\" target=\"_blank\" rel=\"noopener\">Creative-Commons-Lizenz Namensnennung – Weitergabe unter gleichen Bedingungen 4.0 International</a> verwendet. Die Verwendung impliziert keine Billigung durch The R Foundation.",
    "imp.attr.py": "„Python“ und das Python-Logo sind Marken der Python Software Foundation und werden hier gemäß der <a href=\"https://www.python.org/psf/trademarks/\" target=\"_blank\" rel=\"noopener\">PSF Trademark Usage Policy</a> verwendet, um die Technologie zu kennzeichnen, mit der unsere Software entwickelt wurde. Die Verwendung impliziert keine Billigung durch die Python Software Foundation.",
    "imp.attr.inter": "Die Schriftart Inter ist &copy; The Inter Project Authors und wird unter der <a href=\"https://openfontlicense.org/\" target=\"_blank\" rel=\"noopener\">SIL Open Font License 1.1</a> verwendet. Eine Kopie der Lizenz finden Sie unter <a href=\"assets/fonts/OFL.txt\">assets/fonts/OFL.txt</a>.",
    "pkg.version": "Aktuelle Version",
    "pkg.features": "Wichtige Funktionen"
  };

  function translate(lang, key, fallback) {
    if (lang === "de" && Object.prototype.hasOwnProperty.call(de, key)) return de[key];
    return fallback;
  }

  var store = new WeakMap();
  function original(el) {
    var rec = store.get(el);
    if (!rec) { rec = { attrs: {} }; store.set(el, rec); }
    return rec;
  }

  function apply(lang) {
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var rec = original(el);
      if (rec.text === undefined) rec.text = el.textContent;
      el.textContent = translate(lang, el.getAttribute("data-i18n"), rec.text);
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var rec = original(el);
      if (rec.html === undefined) rec.html = el.innerHTML;
      el.innerHTML = translate(lang, el.getAttribute("data-i18n-html"), rec.html);
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var rec = original(el);
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var bits = pair.split(":");
        var attr = (bits[0] || "").trim();
        var key = (bits[1] || "").trim();
        if (!attr || !key) return;
        if (rec.attrs[attr] === undefined) rec.attrs[attr] = el.getAttribute(attr) || "";
        el.setAttribute(attr, translate(lang, key, rec.attrs[attr]));
      });
    });

    document.querySelectorAll(".lang-btn").forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { }

    // Let scripts that render their own text (numbers, dates, fetched values)
    // re-render. Those elements deliberately carry no data-i18n attribute,
    // because this function would otherwise overwrite their content.
    try {
      document.dispatchEvent(new CustomEvent("liora:langchange", { detail: { lang: lang } }));
    } catch (e) { }
  }

  // No stored preference yet: fall back to the browser's own language
  // setting (navigator.languages) rather than always defaulting to English.
  // This reads a setting the browser already exposes locally — no IP
  // geolocation and no network request, so it changes nothing about what
  // data leaves the visitor's device.
  function detectLang() {
    var prefs = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || "en"];
    for (var i = 0; i < prefs.length; i++) {
      if (/^de\b/i.test(prefs[i])) return "de";
    }
    return "en";
  }

  function init() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { }
    var lang = stored || detectLang();
    apply(lang);
    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-lang")); });
    });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();