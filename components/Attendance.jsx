import React from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useState } from "react";
import { useEffect } from "react";
import RadioButtonRN from "radio-buttons-react-native";
import axios from "axios";
import { ScrollView } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function Attendance() {
  const [grade, setGrade] = useState([]);
  const [section, setSection] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [student, setStudent] = useState([]);

  const fetchGradeSection = async () => {
    await axios
      .get("http://192.168.1.114:8001/api/grade")
      .then((res) => setGrade(res.data))
      .catch((err) => console.log(err));
  };

  const fetchallStudentByGradeSection = async () => {
    await axios
      .get(
        `http://192.168.1.114:8001/api/allStudent/${selectedGrade?.id}/${selectedSection?.id}`
      )
      .then((res) => setStudent(res.data))
      .catch((err) => console.log(err));
  };

  const fetchAttendance = async (id, status) => {
    const res = await axios.post(
      `http://192.168.1.114:8001/api/attendance/${id}`,
      {
        status,
      }
    );

    Alert.alert(res.data.message);
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

  const data = [
    {
      label: "present",
    },
    {
      label: "absent",
    },
    {
      label: "late",
    },
  ];

  const logOut = ({ navigation }) => {
    // window.location.href = "/login";
    // window.localStorage.clear();
    // localStorage.removeItem("token");

    navigation.navigate("login");
  };

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
                <RadioButtonRN
                  data={data}
                  selectedBtn={(e) => {
                    console.log(e.label);
                    fetchAttendance(s.id, e.label);
                  }}
                />
              </View>
            );
          })}
        <TouchableOpacity style={styles.button} onPress={()=>logOut}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: "#017f94",
  },
  titleGrade: {
    fontSize: 20,
    color: "#017f94",
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
    color: "#017f94",
  },
});

export default Attendance;
