const module = {
    id: "CS101",
    name: "Introduction to Computer Science",
    description: "Learn the basics of computer science and programming.",
    course: "Computer Science",
};

export default function Module(app) {
    app.get("/lab5/module", (req, res) => {
        res.json(module);
    });
    app.get("/lab5/module/name", (req, res) => {
        res.json(module.name);
    });
    app.get("/lab5/module/description", (req, res) => {
        res.json(module.description);
    });
    app.get("/lab5/module/description/:newDescription", (req, res) => {
        const { newDescription } = req.params;
        module.description = newDescription;
        res.json(module);
    });
};
