function skillsMember()  {
    var skill = $("#skill").val();
    var skillLevel = $("#skillLevel").val();
    var skillDescription = $("#skillDescription").val();
    var skillType = $("#skillType").val();

    var skillData = {
        skill: skill,
        skillLevel: skillLevel,
        skillDescription: skillDescription,
        skillType: skillType
    };

    $.ajax({
        url: "http://localhost:8080/skills",
        type: "POST",
        data: JSON.stringify(skillData),
        contentType: "application/json",
        success: function (data) {
            console.log(data);
            alert("Skill Added Successfully");
            window.location.href = "member.html";
        },
        error: function (error) {
            console.log(error);
        }
    });
}