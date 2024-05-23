export const funEmojies = [
    "🙂", "😊", "😎", "😄", "😁",
    "😆", "😅", "🤣", "😂", "🤩",
    "😍", "😘", "😗", "😚", "😙",
    "😋", "😛", "😜", "🤪", "😝",
    "🤑", "🤗", "🤭", "🤫", "🤔",
    "🤐", "🤨", "😐", "😑", "😶",
    "😏", "😒", "🙄", "😬", "😌",
    "😔", "😪", "🤤", "😴", "😷",
    "🤒", "🤕", "🤢", "🤮", "🤧",
    "🥵", "🥶", "🥴", "😵", "🤯",
];

export const getRandomEmoji = () => {
    return funEmojies[Math.floor(Math.random() * funEmojies.length)];
};