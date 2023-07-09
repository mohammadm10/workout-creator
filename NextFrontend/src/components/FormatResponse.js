function checkFormat(text) {
    const pattern = /^(\d+\.\s[A-Z][a-z]+(\s[A-Z][a-z]+)*(\s-\s|:\s).+(\n)?\s+Tip:.+(\n)*)+$/gm;
    return pattern.test(text);
}

function createWorkoutList(text) {
    const workouts = text.split("\n");
    const workoutObjs= []

    const descriptionSeperator = text.split(". Tip")[0].includes(":") ? ":" : "-";

    for(const workout of workouts){

        const current = {
            title: workout.split(". ")[1].split(` ${descriptionSeperator}`)[0],
            description: workout.split(`${descriptionSeperator} `)[1].split(". Tip")[0],
            tip: workout.split("Tip: ")[1]
        }
        workoutObjs.push(current)
    }
    return workoutObjs;
}