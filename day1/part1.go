package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func main() {
	file, err := os.Open("./input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	lines := make([]int, 0)
	for scanner.Scan() {
		num, err := strconv.Atoi(scanner.Text())
		if err != nil {
			log.Fatal(err)
		}
		lines = append(lines, num)
	}
	// m := make(map[int]bool)
	val := 0
	increases := 0
	for i, v := range lines {
		if i == 0 {
			continue
		}
		if v > val {
			increases++
		}
		val = v
	}
	fmt.Println(increases)
}
