const pagesContent = [
    { title: "Page 1", content: "To stand in thy own light, unafraid of shadows, is the true path to nobility. <br> Do not let doubt cloud thy vision, <br> for thou art stronger than any whisper of uncertainty." },
    { title: "Page 2", content: `Let not the voices of others sway thee too greatly, <br> for thou art the architect of thy own fate. <br> In the garden of thy soul, plant the seeds of confidence <br> and watch them bloom, unyielding and pure.` },
    { title: "Page 3", content: `Though the world may offer its judgments, <br> neither accept nor reject without thought. <br> Be steadfast in thy convictions, <br> yet wise enough to listen to those who speak with care and kindness.` },
    { title: "Page 4", content: `Self-doubt, like a specter, may come unbidden. <br> Yet it is within thy power to cast it aside, <br> for in thee dwells the strength to rise above all fears <br> that may seek to bind thee.` },
    { title: "Page 5", content: `In the quiet moments, take time to reflect upon thy actions. <br> Let not pride blind thee, <br> but neither let the scorn of others determine thy worth. <br> Thou art the judge of thy own character.` },
    { title: "Page 6", content: `Speak with grace, act with purpose, <br> but above all, live with confidence. <br> The world may speak in many voices, <br> yet it is thy own voice that must echo true within thy heart.` },
    { title: "Page 7", content: `Do not yield to the fleeting opinions of the crowd. <br> They change as the wind, <br> but thou must be as the mountain—steadfast, <br> enduring, and unmoved by the whims of others.` },
    { title: "Page 8", content: `Be neither too harsh upon thyself, nor too complacent. <br> Walk the path of balance, <br> where self-awareness meets self-respect, <br> and confidence rises from the foundation of humility.` },
    { title: "Page 9", content: `In times of solitude, find thy center, <br> and let it guide thee. <br> For in moments of peace, <br> thou mayest find the strength to face the judgments of the world without trembling.` },
    { title: "Page 10", content: `As the sun rises and sets, so too do the judgments of men. <br> Do not seek to please them all, <br> but rather seek to honor thy own heart, <br> for in that honor lies true fulfillment.` },
    { title: "Page 11", content: `Let the weight of others' expectations not crush thee. <br> Instead, let them be as stones upon the path, <br> which, though they may cause a stumble, <br> shall never prevent thee from continuing onward.` },
    { title: "Page 12", content: `Confidence is not born of arrogance, <br> but of acceptance—of both thy strength and thy flaws. <br> For in this balance, <br> the soul finds its true freedom.` },
    { title: "Page 13", content: `Though others may point and whisper, <br> remember, thou art not defined by their words. <br> Only thy actions, thy resolve, <br> and thy heart may define thee in the eyes of the true judge: thyself.` },
    { title: "Page 14", content: `Be not quick to anger when met with criticism. <br> Seek first to understand the wisdom behind the words, <br> for they may contain a lesson, <br> even if clothed in harshness.` },
    { title: "Page 15", content: `In all things, let patience be thy companion. <br> For time reveals truth, <br> and with time, thou shalt see clearly the value of each opinion, <br> whether it be sweet or bitter.` },
    { title: "Page 16", content: `Thy heart knows the way, even when others may seek to lead thee astray. <br> Trust it, <br> for it is thy most faithful guide <br> on this journey of life.` },
    { title: "Page 17", content: `Remember, to doubt oneself is human, <br> but to overcome that doubt is divine. <br> In this victory, <br> thou shalt find a wellspring of strength, greater than any that may come from the approval of others.` },
    { title: "Page 18", content: `Let no one’s scorn sway thee from thy path, <br> for each has their own journey. <br> If their words are harsh, <br> let them fall like raindrops upon a stone, unable to change the course of the river that is thy life.` },
    { title: "Page 19", content: `Reflect, but do not linger in the shadows of regret. <br> Move forward with confidence, <br> and let thy heart, ever bold, <br> guide thee to the bright horizon that awaits.` },
    { title: "Page 20", content: `In the grand tapestry of life, remember: thou art both the weaver and the thread. <br> Weave with wisdom, <br> and let thy heart be the compass <br> by which thou steerest thy way.` },
];

const bookContainer = document.getElementById("book-container");

// Loop through pagesContent to generate the content
pagesContent.forEach((page) => {
    const pageDiv = document.createElement("div");
    pageDiv.classList.add("page");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("page-title");
    titleDiv.innerText = page.title;

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("page-content");
    contentDiv.innerHTML = page.content;  // Use innerHTML to handle <br> tags

    pageDiv.appendChild(titleDiv);
    pageDiv.appendChild(contentDiv);

    bookContainer.appendChild(pageDiv);
});
