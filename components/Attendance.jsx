import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Attendance() {


  const [grade, setGrade] = useState([]);
  const [section, setSection] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [student, setStudent] = useState([]);
  const [gradeId, setGradeId] = useState([]);
  const [sectionId, setSectionId] = useState([]);



  const fetchGradeSection = async () => {
    await axios
      .get("http://192.168.1.114:8000/api/grade")
      .then((res) => setGrade(res.data))
      .catch((err) => console.log(err));
  };



  const fetchallStudentByGradeSection = async () => {
    console.log("selectgradeid", selectedGrade?.id);
    await axios
      .get(`http://192.168.1.114:8000/api/allStudent/${selectedGrade?.id}/${selectedSection?.id}`)
      .then((res) => setStudent(res.data))
      .catch((err) => console.log(err));
  };

 console.log(student);

  useEffect(() => {
    fetchGradeSection();
    fetchallStudentByGradeSection();
  }, []);





  const handleGradeChange = (value) => {
    setSelectedGrade(value);
    const selected = grade.find((grade) => grade.name === value);
    setSection(selected.sections);
    console.log('selectedGrade',selectedGrade)
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance</Text>

      <SelectList
        setSelected={handleGradeChange}
        data={grade.map((g) => g.name)}
        placeholder={"Select Grade"}
        boxStyles={{ backgroundColor: "#EE8B3A", marginHorizontal: 20 }}
        dropdownStyles={{ backgroundColor: "#EE8B3A", color: "white" }}
        inputStyles={{ color: "white" }}
      
      />

      <SelectList
        setSelected={(value) => {
          const selected = section.find((s) => s.letter === value);
          setSelectedSection(selected);
          console.log("selectedGrade", selectedGrade);
        }}
        data={section.map((s) => s.letter)}
        placeholder={"Select Section"}
        boxStyles={{
          backgroundColor: "#EE8B3A",
          marginVertical: 10,
          marginHorizontal: 20,
        }}
        dropdownStyles={{ backgroundColor: "#EE8B3A", color: "white" }}
        inputStyles={{ color: "white" }}
        
      />

      <Text style={styles.titleGrade}>
        {selectedGrade?.id} {selectedSection?.id}
      </Text>
      {student &&
        student.map((student) => {
          return <Text key={student.id}>{student.firstName}</Text>;
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: "#1e90ff",
  },
  titleGrade: {
    fontSize: 20,
    color: "#1e90ff",
  },
});

export default Attendance;
