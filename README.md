# The Finals – Match History Website

A fan-made match history site for **The Finals** (because Embark hasn’t made one yet 🤷).  
It lets you browse your past matches, see stats, and get a better idea of how you're doing over time — way beyond the super simple in-game stats screen.

You can check it out here:  
👉 [https://the-finals-visualizer.vercel.app](https://the-finals-visualizer.vercel.app)

## 🔧 How It Works

To use it with your own matches:

1. **Request your data from Embark Studios**  
   You'll need to email them or use their portal to get your match data (it's a GDPR thing).
2. **Upload your data to the site**  
   Once you have the file, you can upload it and browse your match history (00_persistence.jsonl) .
3. **Done!** See your stats, match outcomes, and more.

If you don't have your data yet, **you can browse my matches** to see how the site works.

## 💡 Why I Built This

Mostly because I wanted it — and people on Reddit were asking for it too.  
But the bigger goal is to show that this kind of thing is **useful and wanted**, and maybe encourage Embark to build something like this into the game.

## 🧠 Suggestions & Feedback

Totally open to ideas! If you’ve got a feature request, bug report, or just a thought — feel free to open an issue or drop a comment.

## 🛠️ Tech Stack

- ⚙️ **TypeScript** – typed all the things
- 🎨 **Chakra UI** – for styling and layout
- 📊 **Nivo** – to render clean, interactive charts

> ⚠️ **Disclaimer:** This was a quick side project I built in just a few hours. Best practices probably weren't followed, code might be a bit messy — but hey, it works.

## 🛠️ Dev Setup

If you want to run it locally or contribute:

```bash
git clone https://github.com/Arturzadas/theFinalsVisualizer.git
cd thefinalsvisualizer
npm install
npm run dev
```
