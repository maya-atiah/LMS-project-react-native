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
  const [gradeId, setGradeId] = useState(null);
  const [sectionId, setSectionId] = useState(null);




  const fetchGradeSection = async () => {
    await axios
      .get("http://192.168.1.114:8000/api/grade")
      .then((res) => setGrade(res.data))
      .catch((err) => console.log(err));
  };
  console.log("data", grade);




  const fetchallStudentByGradeSection = async (gradeId, sectionId) => {
    await axios
      .get(`http://192.168.1.114:8000/api/allStudent/${gradeId}/${sectionId}`)
      .then((res) => {
        setStudent(res.data);
        setTable(true);
      })
      .catch((err) => console.log(err));
  };



  useEffect(() => {
    fetchGradeSection();
  }, []);



  const handleGradeChange = (value) => {
    setSelectedGrade(value);
    const selected = grade.find((grade) => grade.name === value);
    setSection(selected.sections);
    setGradeId(selected.id); 
     };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance</Text>

    
      <SelectList
        setSelected={handleGradeChange}
        data={grade ? grade.map((grade) => grade.name) : []}
        placeholder={"Select Grade"}
        boxStyles={{ backgroundColor: "#EE8B3A", marginHorizontal: 20 }}
        dropdownStyles={{ backgroundColor: "#EE8B3A", color: "white" }}
        inputStyles={{ color: "white" }}
        onChange={() => {
          setSection(grade.sections);
          setGradeId(grade.id);
          
        }}
      />
      <SelectList
        setSelected={setSelectedSection}
        data={section.map((section) => section.letter)}
        placeholder={"Select Section"}
        boxStyles={{
          backgroundColor: "#EE8B3A",
          marginVertical: 10,
          marginHorizontal: 20,
        }}
        dropdownStyles={{ backgroundColor: "#EE8B3A", color: "white" }}
        inputStyles={{ color: "white" }}
        onChange={(value) => {
          const selected = section.find((s) => s.letter === value);
          setSelectedSection(selected);
          setSectionId(selected.id);

        }}
      />
    
      <Text style={styles.titleGrade}>
        {selectedGrade} {selectedSection}
      </Text>
      <Text style={styles.titleGrade}>
       
        {gradeId}{sectionId}
      </Text>
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
