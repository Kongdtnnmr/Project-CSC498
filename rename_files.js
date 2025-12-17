
import fs from 'fs';
import path from 'path';

const pwsDir = 'public/pic/pic ปวส';
const pvcDir = 'public/pic/pic ปวช';

const mappings = [
    // PWS
    { dir: pwsDir, old: 'ประเภทวิชาอุตสาหกรรม สาขาวิชาเทคนิคเครื่องกล (กลุ่มอาชีพเครื่องกล และยานยนต์ ).webp', new: 'pws_mech_tech.webp' },
    { dir: pwsDir, old: 'ประเภทวิชาอุตสาหกรรม สาขาวิชาไฟฟ้า (กลุ่มอาชีพพลังงานไฟฟ้าและอิเล็กทรอนิกส์).webp', new: 'pws_elec_power.webp' },
    { dir: pwsDir, old: 'ประเภทวิชาอุตสาหกรรม สาขาวิชาเทคนิคอุตสาหกรรม (กลุ่มอาชีพอุตสาหกรรมการผลิต).webp', new: 'pws_ind_tech.webp' },
    { dir: pwsDir, old: 'ประเภทวิชาอุตสาหกรรม สาขาวิชาเทคโนโลยีอิเล็กทรอนิกส์ (กลุ่มอาชีพพลังงานไฟฟ้าและอิเล็กทรอนิกส์).webp', new: 'pws_ind_elec.webp' },
    { dir: pwsDir, old: 'ประเภทวิชาอุตสาหกรรมสุขภาพและความงาม กลุ่มอาชีพบริการและเสริมสร้างสุขภาพ สาขาวิชาการจัดการธุรกิจการกีฬา.webp', new: 'pws_sports_mgmt.webp' },
    { dir: pwsDir, old: 'ประเภทวิชาอุตสาหกรรม สาขาวิชาเมคคาทรอนิกส์และหุ่นยนต์ (กลุ่มอาชีพเมคคาทรอนิกส์และหุ่นยนต์และระบบอัตโนมัติ).webp', new: 'pws_mecha.webp' },
    { dir: pwsDir, old: 'ประเภทวิชาบริหารธุรกิจ สาขาวิชาการบัญชี (กลุ่มอาชีพการเงินและบัญชี ).webp', new: 'pws_acc.webp' },
    { dir: pwsDir, old: 'ประเภทวิชาบริหารธุรกิจ สาขาวิชาการตลาด (กลุ่มอาชีพการตลาด).webp', new: 'pws_mkt.webp' },
    { dir: pwsDir, old: 'ประเภทวิชาอุตสาหกรรมโลจิสติกส์ สาขาวิชาการจัดการโลจิสติกส์และซัพพลายเชน (กลุ่มอาชีพโลจิสติกส์).webp', new: 'pws_logistics.webp' },
    { dir: pwsDir, old: 'ประเภทวิชาอุตสาหกรรมดิจิทัลและเทคโนโลยีสารสนเทศ สาขาวิชาเทคโนโลยีสารสนเทศ (กลุ่มอาชีพซอฟต์แวร์และโปรแกรมประยุกต์).webp', new: 'pws_it.webp' },
    { dir: pwsDir, old: 'ประเภทวิชาศิลปกรรมและเศรษฐกิจสร้างสรรค์ สาขาวิชาดิจิทัลกราฟิก (กลุ่มอาชีพศิลปะและการออกแบบ).webp', new: 'pws_digital_graphic.webp' },
    { dir: pwsDir, old: 'ประเภทวิชาอุตสาหกรรมสุขภาพและความงาม สาขาวิชาการจัดการงานบริการสถานพยาบาล (กลุ่มอาชีพบริการและเสริมสร้างสุขภาพ).webp', new: 'pws_healthcare.webp' },
    { dir: pwsDir, old: 'ประเภทวิชาอุตสาหกรรม กลุ่มอาชีพเครื่องกลและยานยนต์ สาขาวิชาเทคนิคยานยนต์ไฟฟ้า.webp', new: 'pws_ev.webp' },
    { dir: pwsDir, old: 'ประเภทวิชาอุตสาหกรรมสุขภาพและความงาม สาขาวิชาธุรกิจความงาม (กลุ่มอาชีพเสริมสวยและความงาม).webp', new: 'pws_beauty.webp' },
    { dir: pwsDir, old: 'ประเภทวิชาอุตสาหกรรมสุขภาพและความงาม สาขาวิชาการจัดการธุรกิจการกีฬา.jpg', new: 'pws_sports_mgmt.jpg' },

    // PVC
    { dir: pvcDir, old: 'ประเภทวิชาอุตสาหกรรม สาขาวิชาช่างยนต์ (กลุ่มอาชีพเครื่องกล และยานยนต์).webp', new: 'pvc_auto.webp' },
    { dir: pvcDir, old: 'ประเภทวิชาอุตสาหกรรม สาขาวิชาช่างไฟฟ้า (กลุ่มอาชีพพลังงานไฟฟ้าและอิเล็กทรอนิกส์).webp', new: 'pvc_elec.webp' },
    { dir: pvcDir, old: 'ประเภทวิชาอุตสาหกรรม สาขาวิชาอิเล็กทรอนิกส์ (กลุ่มอาชีพพลังงานไฟฟ้าและอิเล็กทรอนิกส์).webp', new: 'pvc_elec_tech.webp' },
    // Use fallback for mecha as list_dir showed shorter name 'ประเภทวิชาอุตสาหกรรม สาขาวิชาเมคคาทรอนิกส์และหุ่นยนต์.webp' vs long one in code?
    // Wait, the list_dir output Step 477 showed: "ประเภทวิชาอุตสาหกรรม สาขาวิชาเมคคาทรอนิกส์และหุ่นยนต์.webp"
    // But my code used keys with longer names in renaming. 
    // I should check the file list again.
    // Step 477: "ประเภทวิชาอุตสาหกรรม สาขาวิชาเมคคาทรอนิกส์และหุ่นยนต์.webp" (size 145326)
    // The previous error in Step 432 complained about "pic/pic ปวช/ประเภทวิชาอุตสาหกรรม สาขาวิชาเมคคาทรอนิกส์และหุ่นยนต์ (กลุ่มอาชีพเมคคาทรอนิกส์หุ่นยนต์และระบบอัตโนมัติ).webp"
    // Wait, list_dir output seems truncated or I misread?
    // Step 477 output: "ประเภทวิชาอุตสาหกรรม สาขาวิชาเมคคาทรอนิกส์และหุ่นยนต์.webp". It doesn't have the parens group.
    // BUT the gh-pages error complained about the file with parens.
    // Did it get renamed partially? Or is list_dir truncating?
    // List_dir usually shows full name.
    // Let's assume list_dir is correct for what's on disk NOW.
    // But I'll try both just in case.
    { dir: pvcDir, old: 'ประเภทวิชาอุตสาหกรรม สาขาวิชาเมคคาทรอนิกส์และหุ่นยนต์.webp', new: 'pvc_mecha.webp' },
    { dir: pvcDir, old: 'ประเภทวิชาอุตสาหกรรม สาขาวิชาเมคคาทรอนิกส์และหุ่นยนต์ (กลุ่มอาชีพเมคคาทรอนิกส์หุ่นยนต์และระบบอัตโนมัติ).webp', new: 'pvc_mecha.webp' },

    { dir: pvcDir, old: 'ประเภทวิชาบริหารธุรกิจ สาขาวิชาการบัญชี (กลุ่มอาชีพการเงินและบัญชี).webp', new: 'pvc_acc.webp' },
    { dir: pvcDir, old: 'ประเภทวิชาบริหารธุรกิจ สาขาวิชาการตลาด (กลุ่มอาชีพการตลาด).webp', new: 'pvc_mkt.webp' },
    { dir: pvcDir, old: 'ประเภทวิชาอุตสาหกรรมดิจิทัลและเทคโนโลยีสารสนเทศ สาขาวิชาเทคโนโลยีธุรกิจดิจิทัล (กลุ่มอาชีพธุรกิจดิจิทัลและพาณิชย์อิเล็กทรอนิกส์).webp', new: 'pvc_digital_biz.webp' },
    { dir: pvcDir, old: 'ประเภทวิชาอุตสาหกรรมโลจิสติกส์ สาขาวิชาโลจิสติกส์ (กลุ่มอาชีพโลจิสติกส์).webp', new: 'pvc_logistics.webp' },
    { dir: pvcDir, old: 'ประเภทวิชาอุตสาหกรรมท่องเที่ยว สาขาวิชาการท่องเที่ยว (กลุ่มอาชีพการท่องเที่ยว).webp', new: 'pvc_tourism.webp' },
    { dir: pvcDir, old: 'ประเภทวิชา อุตสาหกรรมสุขภาพและความงาม สาขาวิชา ธุรกิจการกีฬา.jpg', new: 'pvc_sports.jpg' }
];

mappings.forEach(m => {
    const oldPath = path.join(m.dir, m.old);
    const newPath = path.join(m.dir, m.new);
    if (fs.existsSync(oldPath)) {
        try {
            fs.renameSync(oldPath, newPath);
            console.log(`Renamed: ${m.old} -> ${m.new}`);
        } catch (e) {
            console.error(`Failed to rename ${m.old}:`, e);
        }
    } else {
        // console.log(`File not found: ${m.old}`);
    }
});
