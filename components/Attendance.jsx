import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useState } from "react";
import { useEffect } from "react";
import RadioGroup from "react-native-radio-buttons-group";
import axios from "axios";
import { ScrollView } from "react-native";

function Attendance() {
  const [grade, setGrade] = useState([]);
  const [section, setSection] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [student, setStudent] = useState([]);

  const fetchGradeSection = async () => {
    await axios
      .get("http://192.168.1.114:8000/api/grade")
      .then((res) => setGrade(res.data))
      .catch((err) => console.log(err));
  };

  const fetchallStudentByGradeSection = async () => {
    await axios
      .get(
        `http://192.168.1.114:8000/api/allStudent/${selectedGrade?.id}/${selectedSection?.id}`
      )
      .then((res) => setStudent(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchGradeSection();
  }, []);

  useEffect(() => {
    if (selectedGrade && selectedSection) {
      fetchallStudentByGradeSection();
    }
  }, [selectedGrade, selectedSection]);

  const handleGradeChange = (value) => {
    const selected = grade.find((grade) => grade.name === value);
    setSection(selected.sections);
    setSelectedGrade(selected);
  };

  const [radioButtons, setRadioButtons] = useState([
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "present",
      value: "present",
    },
    {
      id: "2",
      label: "absent",
      value: "absent",
    },
    {
      id: "3",
      label: "late",
      value: "late",
    },
  ]);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }

  return (
    <ScrollView>
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
        {selectedGrade && selectedSection && (
          <Text style={styles.titleGrade}>
            {selectedGrade.name} {selectedSection.letter}
          </Text>
        )}
        {student &&
          student.map((s) => {
            return (
              <View style={styles.form}>
                <Text style={styles.titlename}>
                  {s.firstName} {s.lastName}
                </Text>
                <RadioGroup
                  style={styles.titlename}
                  radioButtons={radioButtons}
                  onPress={onPressRadioButton}
                />
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
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
  form: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderColor: "#EE8B3A",
    width: "85%",
    borderWidth: 3,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  titlename: {
    fontSize: 20,
    color: "#1e90ff",
  },
});

export default Attendance;
