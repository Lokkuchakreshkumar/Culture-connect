import fs from 'fs';

const filePath = 'c:/Users/kumar/projects/Culture-connect/src/pages/CulturalDances.jsx';
let content = fs.readFileSync(filePath, 'utf-8');

const enrichments = {
    "Bharatanatyam": " Known for its fixed upper torso, legs bent or knees flexed out combined with spectacular footwork, it is considered the mother of many other Indian classical dance forms.",
    "Bhangra": " It was originally performed during the harvest season. Today, it is a globally recognized dance form characterized by its energetic jumps and vibrant costumes.",
    "Garba": " It is traditionally performed during the nine-day Hindu festival Navaratri. The circular patterns of Garba symbolize the Hindu view of time, with the rings of dancers revolving in cycles.",
    "Kathak": " Characterized by intricate footwork and precise rhythmic patterns (tatkar), Kathak dancers use their graceful hand movements and facial expressions to narrate ancient epic tales.",
    "Odissi": " Characterized by the Tribhangi posture, which involves independent movement of the head, chest, and pelvis. It often narrates stories of Lord Krishna.",
    "Kathakali": " It is a story play genre of art, but one distinguished by the elaborately colorful make-up, costumes and face masks that the traditionally male actor-dancers wear.",
    "Kuchipudi": " It shares many elements with Bharatanatyam but includes a unique element where the dancer performs on the edges of a brass plate (Tarangam).",
    "Manipuri": " Also known as Jagoi, it is particularly known for its Hindu Vaishnavism themes, exquisite costumes, and gentle, fluid, and graceful movements.",
    "Sattriya": " Originally performed in monasteries by male monks, it is deeply rooted in the Vaishnava tradition and portrays mythological stories.",
    "Mohiniyattam": " The dance of the enchantress, it features smooth, swaying movements and traditional white and gold costumes.",
    "Ghoomar": " A traditional women's folk dance characterized by spinning in circles to the rhythmic beats of local instruments, displaying the rich culture of the desert state.",
    "Bihu": " This joyous dance celebrates the Assamese New Year and spring festival. It features rapid hand movements and a rhythmic swaying of the hips.",
    "Lavani": " It is a combination of traditional song and dance performed to the beats of a Dholki, known for its powerful rhythm and expressiveness.",
    "Chhau": " A semi-classical Indian dance with martial, tribal, and folk origins. Performers wear striking masks and enact episodes from epics.",
    "Rauf": " A beautiful folk dance of the Kashmir valley, generally performed by women in traditional Pheran suits during Eid and Ramzan.",
    "Karakattam": " An ancient folk dance performed in praise of the rain goddess Mariamman, balancing a beautifully decorated water pot on the head.",
    "Yakshagana": " A traditional theatre form combining dance, music, dialogue, and heavy makeup, mostly depicting stories from the Ramayana and Mahabharata.",
    "Grida Dance": " A harvest dance performed by the tribal communities of Madhya Pradesh, celebrating the bounty of nature.",
    "Goti Pua": " A traditional dance where young boys dress up as women to praise Lord Krishna and Lord Jagannath.",
    "Kalbelia": " Performed by a Rajasthani tribe of the same name, this dance involves sensual, snake-like movements.",
    "Dandiya Raas": " The vibrant stick-dance of Gujarat, celebrating the playful mock-fight between Goddess Durga and Mahishasura.",
    "Pulikali": " Also known as Tiger Dance, it is a colorful recreational folk art performed by trained artists during Onam in Kerala."
};

let updatedDances = 0;
// Add descriptions
Object.keys(enrichments).forEach(dance => {
    const reg = new RegExp(`(name:\\s*"${dance}",[\\s\\S]*?description:\\s*")([^"]*)(")`, "g");
    content = content.replace(reg, (match, p1, p2, p3) => {
        if (!p2.includes(enrichments[dance])) {
            updatedDances++;
            return p1 + p2 + enrichments[dance] + p3;
        }
        return match;
    });
});

// Update Odissi image to the highly genuine classical one requested
const odissiImgReg = /(name:\s*"Odissi",[\s\S]*?imageUrl:\s*")[^"]*(")/;
content = content.replace(odissiImgReg, `$1https://upload.wikimedia.org/wikipedia/commons/e/e0/Odissi_performance_by_Sujata_Mohapatra_-_03.jpg$2`);

fs.writeFileSync(filePath, content);
console.log(`Updated ${updatedDances} descriptions and Odissi image.`);
